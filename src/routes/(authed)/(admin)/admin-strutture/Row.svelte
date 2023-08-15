<script>
	export let users;

	$: console.log(users);
</script>

{#if users}
	<tr>
		{#each users as user}
			<td>{user}</td>
		{/each}
	</tr>
{/if}
