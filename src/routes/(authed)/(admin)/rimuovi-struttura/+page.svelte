<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: structures = data.structures.structures;

	$: success = form?.success;
	$: selected = form?.success ? form.success.reset : {};
	$: error = form?.error;
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container w-1/2 mx-auto m-10 text-center">
	<!-- Native Table Element -->
	<table class="table table-comfortable table-interactive">
		<thead>
			<tr>
				<th class="text-center">Id</th>
				<th class="text-center">Nome struttura</th>
			</tr>
		</thead>
		<tbody>
			{#each structures as s}
				<tr
					on:click={() => {
						selected = s;
					}}
					class={selected == s ? 'table-row-checked' : ''}
				>
					<td>{s.id}</td>
					<td>{s.structure.nome}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if selected.structure}
	<form method="post" action="?/removeStructure" class="flex container w-full mx-auto" use:enhance>
		<input hidden name="structure" value={JSON.stringify(selected)} />
		<button class="btn variant-filled mx-auto p-4" type="submit">
			<h4 class="h4">
				Vuoi davvero eliminare la struttura "{selected.structure.nome}"?
			</h4>
		</button>
	</form>
{/if}

{#if success}
	<h3 class="h3 mx-auto w-max my-40">Hai eliminato correttamente la struttura selezionata.</h3>
{:else if error}
	<h3 class="underline h3 mx-auto underline-offset-auto decoration-error-500 w-max my-40">
		{error.message}
	</h3>
{/if}
