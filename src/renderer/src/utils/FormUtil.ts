export class FormUtil {
	public static getFormData(form: HTMLFormElement): Object {
		const form_inputs = form.querySelectorAll('input')
		const form_datas = {}
		form_inputs.forEach((input) => {
			form_datas[input.name] = input.value
		})
		return form_datas
	}
}
