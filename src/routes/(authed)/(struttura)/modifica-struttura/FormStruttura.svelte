<script>
	export let id = 0;
	export let nome;
	export let fondazione;
	export let dimensione;
	export let spogliatoi;
</script>

<form
	method="post"
	action="?/modifyInfo"
	class="card mx-auto flex flex-col container p-4 gap-4 m-4"
>
	<input hidden type="number" name="id" bind:value={id} />
	<label class="label">
		<span>Nome società</span>
		<input class="input" name="nome" bind:value={nome} />
	</label>
	<label class="label">
		<span>Anno fondazione</span>
		<input class="input" type="date" name="fondazione" bind:value={fondazione} />
	</label>
	<label class="label">
		<span>Dimensione (m<sup>2</sup>)</span>
		<input class="input" type="number" name="dimensione" bind:value={dimensione} />
	</label>
	<label class="label flex items-center space-x-4 flex-col">
		<span>Ci sono spogliatoi?</span>
		<input
			class="checkbox"
			type="checkbox"
			name="spogliatoi"
			bind:value={spogliatoi}
			bind:checked={spogliatoi}
		/>
	</label>
	<button type="submit" class="btn variant-filled w-full">
		<h3 class="h3">Conferma modifiche</h3>
	</button>
</form>
