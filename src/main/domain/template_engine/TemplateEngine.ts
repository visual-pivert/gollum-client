/**
 * Class that contains all manipulation for gollum templating
 */

import { debug } from "node:console"


export type GollumBuffer = {token: string, lines: number[], name: string}[]


export class TemplateEngine {

	protected text: string

	public constructor (text: string) {
		this.text = text

	}

 /**
  * Change all buffer as specified value
  * values {buffer: value_in_the_buffer}
  * @param {{[key: string]: string}} values
  * @returns {string}
  */
	public apply (values: {[key: string]: string}): string {
		const all_buffer = this.getAllBufferStringDetails()
		let file_str = this.text
		let file_array = file_str.split('\n')

		// delete lines if '' or null or undifined
		for (const buffer of all_buffer) {
			if (!values[buffer.name]) {
				for (const line of buffer.lines) {
					file_array[line - 1] = ''
				}
			}
		}

		file_str = file_array.join("\n")
		for (const buffer of all_buffer) {
			file_str = file_str.replaceAll(buffer.token, values[buffer.name] ?? '')
		}
		return file_str
	}

	/**
	 * Description
	 * @returns {GollumBuffer}
	 */
	public getAllBufferStringDetails (): GollumBuffer {
		const re = /<\|\s*[a-zA-z1-9]+\s*\|>/g
		let matched = new Set(this.text.match(re)) // recupere les tokens des buffer
		if (!matched) {
			throw new Error('Not an instance of Gollum template')
		}
		const out: GollumBuffer = [] // Variable qui sera retourner
		let text_arr = this.text.split('\n') // On split le text par \n (utile pour la recuperation des liges)
		for (const m of matched) {

			// recuperation des lignes contenant la valeur de m
			const tmp_arr = text_arr.map((line_txt) => line_txt.indexOf(m) >= 0 ? m : '')
			const index = tmp_arr.reduce(function (ind: any[], el, i) { if (el === m) ind.push(i+1); return ind }, []);

			// Creation de l'ouptput de la fonction
			out.push({
				token: m,
				lines: index,
				name: this.getOutSpecialChar(m)
			})
		}
		return out
	}

	public getOutSpecialChar(buffer: string) {
		return buffer.replaceAll(/<|>|\|/g, '')
	}
}
