<script>
	export let users;
</script>

{#if users}
	<tr>
		{#each users as user}
			<td>{user}</td>
		{/each}
	</tr>
{/if}
