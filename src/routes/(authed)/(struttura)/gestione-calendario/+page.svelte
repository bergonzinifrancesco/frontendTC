<script>
	import { page } from '$app/stores';

	export let data;
	$: structures = data.structures;

	let selected = 0;
</script>

<div class="table-container p-4 m-4 mx-auto">
	{#each data.ids as id}
		<!-- Native Table Element -->
		<table class="table table-hover table-interactive">
			<thead>
				<tr>
					<th>Id</th>
					<th>Nome struttura</th>
					<th>Lat</th>
					<th>Long</th>
				</tr>
			</thead>
			<tbody>
				<tr on:click={() => (selected = id)} class={selected == id ? 'table-row-checked' : ''}>
					<td>{id}</td>
					<td>{structures.get(id).nome}</td>
					<td>{structures.get(id).lat}</td>
					<td>{structures.get(id).long}</td>
				</tr>
			</tbody>
		</table>
	{/each}
</div>

<div class="grid grid-cols-1 container mx-auto text-end p-4 m-4 w-full h-full">
	{#if selected > 0}
		<a
			href={$page.url.pathname + '/' + selected}
			class="h3 text-center hover:bg-primary-hover-token">Spostati al calendario della struttura.</a
		>
	{/if}
</div>
