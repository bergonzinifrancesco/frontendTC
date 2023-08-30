<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { FileButton } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let avatarPath: string = '';
	export let fileSize: number;
	export let error: string | undefined;
	export let success: boolean | undefined;
	let files: FileList;

	let imageElement: HTMLImageElement;
	let fileReader: FileReader;

	onMount(() => {
		fileReader = new FileReader();
		imageElement = new Image();

		fileReader.onload = (f) => {
			imageElement.src = f.target?.result;
		};
	});

	function updateImage() {
		if (files && imageElement) {
			const file = files[0];
			fileReader.readAsDataURL(file);
		}
	}
</script>

<div class="card w-3/4 mx-auto">
	<header class="card-header p-4">
		<h3 class="h3">Avatar utente</h3>
		<p>Dimensione massima: {fileSize} Kb</p>
	</header>
	<section class="p-4">
		<form method="post" action="?/uploadAvatar" use:enhance>
			<input name="fileSize" type="number" value={fileSize} hidden />
			<FileButton
				name="file"
				button="btn"
				bind:files
				accept="image/*"
				width="w-full"
				formaction="?/uploadAvatar"
				on:change={updateImage}
			>
				<img
					bind:this={imageElement}
					src={imageElement ? imageElement.src : avatarPath}
					alt="Il tuo avatar"
					class="card card-hover p-2"
				/>
			</FileButton>
			<button type="submit" class="btn variant-filled-primary w-full my-4">
				<h3 class="h3">Conferma invio</h3>
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
					<p>Immagine caricata con successo.</p>
				</div>
			</div>
		{/if}
	</footer>
</div>
