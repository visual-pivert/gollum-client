<script>
	import { fade } from 'svelte/transition'
	import Buttons from './Buttons.svelte'
	import Notif from './Notif.svelte'

	let notifications = [
		{
			title: 'notif0',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur magni quae nobis dolores repellendus dolore rerum aperiam culpa error atque.',
			action: {
				label: 'hello',
				func: () => {
					alert('hello')
				}
			}
		},
		{
			title: 'notif1',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur magni quae nobis dolores repellendus dolore rerum aperiam culpa error atque.'
		},
		{
			title: 'notif2',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur magni quae nobis dolores repellendus dolore rerum aperiam culpa error atque.'
		},
		{
			title: 'notif3',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur magni quae nobis dolores repellendus dolore rerum aperiam culpa error atque.'
		}
	]

	function deleteNotif(notif) {
		delete notifications[notifications.indexOf(notif)]
		notifications = [...notifications].filter((notif) => {
			return notif != undefined
		})
	}
</script>

{#if notifications.length > 0}
	<div
		class="flex flex-col justify-end gap-2 absolute bottom-notif-bottom right-notif-right w-max h-4/5 bg-transparent z-50"
	>
		{#if notifications.length > 1}
			<button
				class="self-end flex items-center gap-2 opacity-50 hover:opacity-100 hover:text-red"
				on:click={() => {
					notifications = []
				}}
			>
				<span class="bg-background3 p-1 px-2 rounded">Effacer tous</span>
			</button>
		{/if}
		{#each notifications as notif}
			<div
				bind:this={notif.element}
				transition:fade
				class="text-font-color2 flex flex-col gap-1 bg-background2 border border-solid border-background3 rounded-lg p-2 w-80 shadow-md"
			>
				<header
					class="flex justify-between items-center gap-2 border-b border-solid border-background3 p-1 pt-0"
				>
					<div class="w-full overflow-hidden overflow-ellipsis">
						<span class="text-font-color">{notif.title}</span>
					</div>
					<button
						on:click={() => {
							notif.element.remove()
							// deleteNotif(notif)
						}}
					>
						<i
							class="ri-close-line text-base leading-none hover:bg-background3 rounded text-red"
						></i>
					</button>
				</header>
				<p class="p-1">{notif.content}</p>
				{#if notif.action}
					<!-- <div class="w-max self-end mr-1 mt-2"> -->
					<Buttons
						label={notif.action.label}
						bg_color="--blue-btn"
						on:click={notif.action.func}
					/>
					<!-- </div> -->
				{/if}
			</div>
		{/each}
	</div>
{/if}
