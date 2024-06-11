import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { env } from '../../env'
import simpleGit, { SimpleGit } from 'simple-git'
import { configFileGenerartor } from './ConfigFileGenerator'
import fs from 'node:fs'
import path from 'node:path'

export class ProdRepo {

	private repo_name: string
	private branch: string
	private config: {[key: string]: string} = {}
	private config_name: string = ''
	private template_name: string = ''
	private db_config = {
		filename: env['PROD_DB_PATH'],
		driver: sqlite3.Database
	}


	public constructor(repo_name: string, branch: string){
		this.repo_name = repo_name
		this.branch = branch
	}

	public async createConfig(config_name: string, config: {[key: string]: string}, template_name: string): Promise<this> {
		this.config_name = config_name
		this.config = config
		this.template_name = template_name
		return this
	}


	public async useExistingConfig(config_name: string): Promise<this> {
		// Recupere le dernier dans la base et faire un creatConfig
		const db = await open(this.db_config)
		const stmt = await db.prepare('SELECT * FROM Productions WHERE config_name=@config_name AND timestamp=(SELECT MAX(timestamp) FROM PRODUCTIONS)')
		await stmt.bind({'@config_name': config_name})
		const datas = await stmt.get()
		await this.createConfig(datas.config_name, JSON.parse(datas.config), datas.template_name)
		return this
	}


	public async saveConfig() {
		// Prendre ce qui sont dans les parametres et les sauvegarde dans la base de donnee
		const db = await open(this.db_config)
		await db.run(
			'INSERT INTO Productions VALUES (?, ?, ?, ?, ?, ? ,?)',
			null,
			this.repo_name,
			this.branch,
			Date.now(),
			JSON.stringify(this.config),
			this.config_name,
			this.template_name
		)

	}

	private async deleteFolderRecursive(folderPath: string) {
		if (fs.existsSync(folderPath)) {
			fs.readdirSync(folderPath).forEach((file) => {
				const curPath = path.join(folderPath, file);
				if (fs.lstatSync(curPath).isDirectory()) {
					this.deleteFolderRecursive(curPath); // Supprime le contenu du sous-répertoire
					fs.rmdirSync(curPath); // Supprime le sous-répertoire une fois son contenu supprimé
				} else {
					fs.unlinkSync(curPath); // Supprime le fichier
				}
			});
		}
	}

	public async cleanProdDir() {
		const local_prod_path = env['LOCAL_PROD_PATH']
		await this.deleteFolderRecursive(local_prod_path)
	}


	public async putOnProduction() {
		/**
		 * Clonage de la branche depuis le depot local vers un dossier prod
		 * Generation de la configuration
		 * Copie de la configuration vers le dossier prod
		 */

		const local_prod_path = env['LOCAL_PROD_PATH']
		const local_repo_path = env['LOCAL_REPO_PATH']
		const template_path = env['TEMPLATE_PATH']
		const git = simpleGit(local_prod_path)
		try {
			await git.clone(local_repo_path + '/' + this.repo_name, local_prod_path+'/'+this.repo_name, {
				'--branch': this.branch,
				'--depth': 1
			})
		} catch (e: any) {
			console.log(e.message)
		}

		const config_file_gen = new configFileGenerartor()
		config_file_gen.defineTemplate(template_path + '/' + this.template_name)
		config_file_gen.configure(this.config, local_prod_path + '/' + this.repo_name)

		await this.saveConfig()
	}

}
