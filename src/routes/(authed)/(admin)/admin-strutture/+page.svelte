<script>
	import { Paginator } from '@skeletonlabs/skeleton';
	import Row from './Row.svelte';

	export let data;

	$: structures = data.structures.structures;

	let settings = {
		offset: 0,
		limit: 1,
		size: data.structures.structures.length,
		amounts: [1]
	};

	$: actualStructure = structures.slice(
		settings.offset * settings.limit,
		settings.offset * settings.limit + settings.limit
	)[0];
</script>

<div class="container mx-auto flex flex-col place-items-center gap-4 m-4 p-4">
	<Paginator
		bind:settings
		select="hidden"
		justify="justify-center"
		showPreviousNextButtons={true}
		showFirstLastButtons={true}
	/>
	<div class="table-container mx-auto p-4">
		<h3 class="h3">{actualStructure.structure.nome} (id: {actualStructure.id})</h3>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Nome utente</th>
				</tr>
			</thead>
			<tbody>
				<Row users={data.admins.get(actualStructure.id.toString())} />
			</tbody>
		</table>
	</div>
</div>
