<script>
	let notifications = [
		{
			title: 'notif',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur magni quae nobis dolores repellendus dolore rerum aperiam culpa error atque.'
		}
	]
</script>

<div class="p-3">
	{#if notifications.length > 0}
		<span>Notifications :</span>
		<div>
			{#each notifications as notif}
				<div>
					<p>{notif.title}</p>
					<p>{notif.content}</p>
				</div>
			{/each}
		</div>
	{:else}{/if}
</div>
