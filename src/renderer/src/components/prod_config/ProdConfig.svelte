<script>
	let tech_list = ['wordpress', 'laravel', 'symfony', 'django']
</script>

<div class="bg-background2 p-3 rounded-lg">
	<div>
		<label for="tech">technologie:</label>
		<select name="tech" id="tech">
			{#each tech_list as tech}
				<option value={tech}>{tech}</option>
			{/each}
		</select>
	</div>
</div>
