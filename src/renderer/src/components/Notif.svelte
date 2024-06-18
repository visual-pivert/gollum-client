<script>
	import Buttons from './Buttons.svelte'

	export let notif
</script>

<div
	class="text-font-color2 flex flex-col gap-1 bg-background2 border border-solid border-background3 rounded-lg p-2 w-80 shadow-md"
>
	<header
		class="flex justify-between items-center gap-2 border-b border-solid border-background3 p-1 pt-0"
	>
		<div class="w-full overflow-hidden overflow-ellipsis">
			<span class="text-font-color">{notif.title}</span>
		</div>
		<i class="ri-close-line text-base leading-none hover:bg-background3 rounded text-red"></i>
	</header>
	<p class="p-1">{notif.content}</p>
	{#if notif.action}
		<!-- <div class="w-max self-end mr-1 mt-2"> -->
		<Buttons label={notif.action.label} bg_color="--blue-btn" on:click={notif.action.func} />
		<!-- </div> -->
	{/if}
</div>
