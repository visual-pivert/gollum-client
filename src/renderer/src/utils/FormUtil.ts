
/**
 * Class that contain many methods for form manipulation
 */
export class FormUtil {

	/**
	 * Take html form value and return values of all inputs in
	 *
	 * @param {HTMLFormElement} form -- must contain html form element
	 * @returns {any} -- return an object of html name attr and html value attr
	 */
	public static getFormData(form: HTMLFormElement): Object {
		const form_inputs = form.querySelectorAll('input')
		const form_datas = {}
		form_inputs.forEach((input) => {
			form_datas[input.name] = input.value
		})
		return form_datas
	}
}
