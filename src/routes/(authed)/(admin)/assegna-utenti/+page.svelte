<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: structures = data.structures?.structures;
	let selectedUser = null;
	let selectedStructure = null;

	$: structureInfo = selectedStructure
		? JSON.stringify([selectedStructure.structure.nome, selectedStructure.id])
		: '';

	$: userInfo = selectedUser ? JSON.stringify(selectedUser) : '';
</script>

<div class="table-container p-4">
	<table class="table table-interactive">
		<thead>
			<tr>
				<th>Nome utente</th>
				<th>Id</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr
					on:click={() => {
						selectedUser = user;
					}}
					class={selectedUser == user ? 'table-row-checked' : ''}
				>
					<td>{user[0]}</td>
					<td>{user[1]}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Numero attuale di utenti</th>
				<td>{data.users.length}</td>
			</tr>
		</tfoot>
	</table>
</div>
<hr />
<div class="table-container p-4">
	<table class="table table-interactive">
		<thead>
			<tr>
				<th>Nome struttura</th>
				<th>Id</th>
			</tr>
		</thead>
		<tbody>
			{#each structures as s}
				<tr
					on:click={() => {
						selectedStructure = s;
					}}
					class={selectedStructure == s ? 'table-row-checked' : ''}
				>
					<td>{s.structure.nome}</td>
					<td>{s.id}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Numero attuale di strutture</th>
				<td>{structures.length}</td>
			</tr>
		</tfoot>
	</table>
</div>
<hr />
<form
	method="post"
	class="card container mx-auto grid grid-cols-2 p-4 m-4 justify-items-center gap-4"
	use:enhance
>
	<label class="label text-center">
		<span>Utente selezionato</span>
		<input bind:value={userInfo} class="input" name="user" readonly />
	</label>
	<label class="label text-center">
		<span>Struttura selezionata</span>
		<input bind:value={structureInfo} class="input" name="structure" readonly />
	</label>
	<button
		type="submit"
		class="btn variant-filled mx-auto col-span-2"
		disabled={!selectedStructure || !selectedUser}
	>
		<h4 class="h4">Promuovi utente ad admin struttura</h4>
	</button>
</form>

{#if form?.success}
	<div class="container grid grid-cols-1 text-center p-4 mx-auto my-10">
		<h3 class="h3">
			<b>{form?.success.user}</b> è stato promosso ad admin di <b>{form?.success.structure}</b> (id: {form
				?.success.structure_id})
		</h3>
	</div>
{:else if form?.error}
	<div class="container grid grid-cols-1 text-center p-4 mx-auto my-20">
		<h3 class="h3 underline underline-offset-auto text-error-500">
			<b>C'è stato un errore con l'assegnazione.</b>
		</h3>
	</div>
{/if}
