<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { getCodeList } from 'country-list';
	import intlTelInput from 'intl-tel-input';
	import 'intl-tel-input/build/css/intlTelInput.css';
	import { onMount } from 'svelte';

	export let peso: number;
	export let altezza: number;
	export let data_nascita: Date;
	export let bio: string;
	export let nazionalità: string;
	export let numero_telefono: string;

	export let error: string | undefined;
	export let success: boolean | undefined;

	let countries = getCodeList();

	let element;
	let iti;
	onMount(async () => {
		iti = intlTelInput(element, {
			utilsScript: await import('intl-tel-input/build/js/utils'),
			autoInsertDialCode: true,
			nationalMode: false,
			separateDialCode: false
		});
	});

	$: nationality = nazionalità.toLowerCase();
	$: phoneNumber = iti ? iti.getNumber() : numero_telefono;
</script>

<div class="card w-3/4 mx-auto">
	<header class="card-header p-4">
		<h3 class="h3">Info Avanzate</h3>
	</header>
	<section class="p-2">
		<form method="POST" action="?/changeAdvancedInfo">
			<label class="label">
				<span>Peso (in Kg)</span>
				<input
					name="peso"
					type="number"
					step="0.1"
					min="40"
					max="200"
					placeholder="00.0"
					bind:value={peso}
					class="input p-2"
				/>
			</label>
			<label class="label">
				<span>Altezza (in cm, intero)</span>
				<input
					name="altezza"
					type="number"
					bind:value={altezza}
					placeholder="000"
					class="input p-2"
				/>
			</label>
			<label class="label">
				<span>Data di Nascita</span>
				<input
					name="dataNascita"
					type="date"
					bind:value={data_nascita}
					placeholder="01/01/0000"
					class="input p-2"
				/>
			</label>
			<label class="label">
				<span>Nazionalità</span>
				<select class="select p-2" bind:value={nationality} name="nazionalità">
					{#each Object.entries(countries) as [code, name]}
						<option value={code}>{name}</option>
					{/each}
				</select>
			</label>
			<label class="label flex container flex-col">
				<span>Numero telefono</span>
				<input
					name="numeroTelefono"
					type="string"
					bind:this={element}
					bind:value={phoneNumber}
					class="input p-2"
					on:countrychange={(e) => {
						console.log('country change');
						phoneNumber = iti.getNumber();
					}}
				/>
			</label>
			<label class="label">
				<span>Bio</span>
				<input name="bio" type="string" bind:value={bio} class="input p-2" />
			</label>
			<button type="submit" class="btn variant-filled-primary w-full my-4">
				<h3 class="h3">Conferma modifiche info avanzate</h3>
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
