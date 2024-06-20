<script lang="ts">
	import { Timer } from '../../utils/Timer'
	import Buttons from '../Buttons.svelte'
	import { right_buttons_events } from '../right_aside/right_aside_buttons'
	import { fly } from 'svelte/transition'

	let notifications = []

	let notif_wrapper: HTMLElement
	let notif_closed: Boolean = false

	document.addEventListener('show_notif', () => {
		timer.start()
		notif_closed = !notif_closed
	})

	const deleteNotif = (notif) => {
		notifications = notifications.filter((el) => el != notif)
	}

	const deleteAllNotif = () => {
		notifications = []
	}

	const closeNotif = () => {
		notif_closed = true
	}

	const timer = new Timer(closeNotif, 3000)

	let count = 0 // JUSTE POUR TESTER
	const new_notif = {
		title: 'nootif',
		id: 0, // JUSTE POUR TESTER
		content: 'Loooorem ipsum',
		action: {
			label: 'Hello',
			func: () => {
				document.dispatchEvent(right_buttons_events.ftp)
			}
		}
	}

	document.addEventListener('notify', () => {
		timer.start()

		let tmp = { ...new_notif }

		// JUSTE POUR TESTER
		tmp.id = count++
		tmp.title = tmp.title + tmp.id
		// ==================

		notifications = [...notifications, tmp]
		notif_closed = false

		onanimationstart = () => {
			notif_wrapper.scrollTop = notif_wrapper.scrollHeight
		}
	})
</script>

{#if !notif_closed}
	<div
		transition:fly={{ y: 100 }}
		class="notif-container flex flex-col justify-end gap-2 absolute bottom-notif-bottom right-notif-right w-max max-h-notif-height overflow-hidden bg-transparent z-50"
		on:mouseover={() => {
			timer.stop()
		}}
		on:mouseleave={() => {
			timer.start(1000)
		}}
		role="group"
		on:focus={() => {}}
	>
		{#if notifications.length > 0}
			<header class="flex flex-row-reverse gap-2 items-center mr-2">
				<button
					class=" opacity-50 hover:opacity-100 hover:text-red"
					on:click={deleteAllNotif}
				>
					<i class="ri-close-line text-base leading-none"></i>
				</button>
				<button class=" opacity-50 hover:opacity-100 hover:text-red" on:click={closeNotif}>
					<i class="ri-arrow-down-s-line"></i>
				</button>
			</header>
		{/if}

		<div
			bind:this={notif_wrapper}
			class="notif-wrapper flex flex-col gap-2 overflow-auto overflow-x-hidden pr-1"
		>
			{#each notifications as notif (notif)}
				<div
					bind:this={notif.element}
					transition:fly={{ x: 100 }}
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
								deleteNotif(notif)
							}}
						>
							<i
								class="ri-close-line text-base leading-none hover:bg-background3 rounded text-red"
							></i>
						</button>
					</header>
					<p class="p-1">{notif.content}</p>
					{#if notif.action}
						<Buttons
							label={notif.action.label}
							bg_color="--blue-btn"
							on:click={() => {
								notif.action.func()
								deleteNotif(notif)
							}}
						/>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.notif-wrapper::-webkit-scrollbar-thumb {
		background-color: var(--background3);
	}
</style>
