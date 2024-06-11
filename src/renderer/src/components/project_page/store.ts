import { is_local_project, selected_project, current_directory, current_directory_path, selected_branch } from "../../store"
import { get } from "svelte/store"

export async function defineDir () {
	const logged_user = await window.api.getLoggedUser()
	let getted_current_directory
	if (get(is_local_project)) {
		await window.api.localCheckout(get(selected_project).repo_path, get(selected_branch))
		getted_current_directory = await window.api.localRepoTree(get(current_directory_path).join('/'))
		current_directory.update(() => getted_current_directory)
	} else {
		getted_current_directory = await window.api.apiRepoTree(logged_user.access_token, get(selected_project).repo_path, get(selected_branch), get(current_directory_path).slice(1).join('/'))
		current_directory.update(()=>getted_current_directory.datas)
	}
	current_directory.update((old) => sortFiles(old))
}

function sortFiles(files: any[]): any[] {
	return files.sort((a, b) => {
	  if (a.type === b.type) {
		return a.name.localeCompare(b.name);
	  }
	  return a.type === 'tree' ? -1 : 1;
	});
}
