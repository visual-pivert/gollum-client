import { GollumBuffer, TemplateEngine } from "../template_engine/TemplateEngine"
import fs from 'node:fs'

export type TemplateDetail = {
	file_path: string,
	file_content: string,
	file_name: string
}

export class configFileGenerartor {

	public template_details: TemplateDetail[] = []

	public defineTemplate(template_path: string): this {
		// const template_files = fs.readdirSync(template_path, {recursive: true})
		const template_files = fs.readdirSync(template_path, {recursive: true})
		for ( const tf of template_files ) {
			const file_path = template_path + '/' + tf
			try {
				const template_detail: TemplateDetail = {
					file_path: file_path,
					file_content: fs.readFileSync(file_path).toString(),
					file_name: tf as string
				}
				this.template_details.push(template_detail)
			} catch (e: any) {
				if ('EISDIR' === e.code) {
					continue
				}
			}
		}
		return this
	}

	public listTemplate(template_dir_path: string): string[] {
		const tdp = template_dir_path
		return fs.readdirSync(tdp)
	}

	public getBuffers(): {[key: string]: GollumBuffer} {
		let buffer_out: {[key: string]: GollumBuffer} = {}
		for (const template_detail of this.template_details){
			const template_engine = new TemplateEngine(template_detail.file_content)
			const buf = template_engine.getAllBufferStringDetails()
			buffer_out[template_detail.file_name] = buf
		}
		return buffer_out
	}

	private uniqueIt(buffers: GollumBuffer): GollumBuffer {
		const obj: { [key: string]: any } = {}
		for (const buf of buffers) {
			if (!obj[buf.name]) {
				obj[buf.name] = buf
			} else {
				// ajout des lignes
				const concat_lines = obj[buf.name]['lines'].concat(buf.lines)
				const unique_it = new Set(concat_lines)
				const out_lines = [...unique_it]
				obj[buf.name] = {token: buf.token, name: buf.name, lines: out_lines}
			}
		}
		return Object.values(obj) as GollumBuffer

	}


	public generateConfig(configuration: {[key: string]: string}): TemplateDetail[] {
		const out: TemplateDetail[] = []
		for (const template_detail of this.template_details){

			const template_engine = new TemplateEngine(template_detail.file_content)
			const td: TemplateDetail = { ...template_detail }
			td['file_content'] = template_engine.apply(configuration)
			out.push(td)
		}
		return out
	}

	public configure(configurations: {[key: string]: string}, project_path: string) {
		const generated_config = this.generateConfig(configurations)

		// creer et ecrire le fichier dans la cible
		for (const one_config of generated_config) {
			const file_path = project_path + '/' + one_config.file_name
			try {
				fs.writeFileSync(file_path, one_config.file_content, {flag: 'w'})
			} catch (e: any) {
				fs.mkdirSync(project_path + '/' + one_config.file_name.substring(0, one_config.file_name.lastIndexOf('/')))
				fs.writeFileSync(file_path, one_config.file_content, {flag: 'w'})
			}
		}
	}
}
