<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	export let id: Number;
	export let first_name: string;
	export let last_name: string;
	export let email: string;

	export let error: string | undefined;
	export let success: boolean | undefined;
</script>

<div class="card w-3/4 mx-auto">
	<header class="card-header p-4">
		<h3 class="h3">Info Base utente</h3>
	</header>
	<section class="p-2">
		<form method="POST" action="?/changeBasicInfo">
			<label class="label">
				<span>Id</span>
				<input name="id" type="number" bind:value={id} class="input p-2" disabled />
			</label>
			<label class="label">
				<span>Email</span>
				<input name="email" type="string" bind:value={email} class="input p-2" />
			</label>
			<label class="label">
				<span>Nome</span>
				<input name="firstName" type="string" bind:value={first_name} class="input p-2" />
			</label>
			<label class="label">
				<span>Cognome</span>
				<input name="lastName" type="string" bind:value={last_name} class="input p-2" />
			</label>
			<button type="submit" class="btn variant-filled-primary w-full my-4">
				<h3 class="h3">Conferma modifiche info base</h3>
			</button>
		</form>
	</section>
	<footer>
		{#if error}
			<div class="alert variant-filled-error" in:fade|once={{ delay: 200, duration: 500 }}>
				<div class="alert-message">
					<p>{error}</p>
				</div>
			</div>
		{:else if success}
			<div class="alert variant-filled-success" in:fade|once={{ delay: 200, duration: 500 }}>
				<div class="alert-message">
					<p>Informazioni base cambiate con successo.</p>
				</div>
			</div>
		{/if}
	</footer>
</div>
