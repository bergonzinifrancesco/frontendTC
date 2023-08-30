<script lang="ts">
	import { enhance } from '$app/forms';
	import { ProgressBar, focusTrap } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
	import * as zxcvbnItPackage from '@zxcvbn-ts/language-it';

	let password = '';
	let confirmPassword = '';

	const options = {
		translations: zxcvbnItPackage.translations,
		graphs: zxcvbnCommonPackage.adjacencyGraphs,
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary,
			...zxcvbnItPackage.dictionary
		}
	};
	zxcvbnOptions.setOptions(options);

	$: valutation = zxcvbn(password);

	export let form;
</script>

<div class="h-full flex flex-col items-center justify-center">
	<div class="card p-4 w-1/2">
		<form method="POST" action="?/signup" use:enhance use:focusTrap={true}>
			<label>
				Username
				<input
					title="Input username"
					name="username"
					class="input {form?.username ? 'input-error' : ''}"
					placeholder="pippo_paperino"
					required
				/>
			</label>
			<label>
				Password
				<input
					title="Input password"
					name="password"
					type="password"
					bind:value={password}
					placeholder="La tua password"
					class="input"
					required
				/>
			</label>
			<ProgressBar min={0} max={4} rounded="rounded" bind:value={valutation.score} />
			{#if valutation.feedback.warning}
				<p class="variant-soft-error">
					{valutation.feedback.warning}
				</p>
			{/if}
			{#if valutation.feedback.suggestions}
				<ul class="list">
					{#each valutation.feedback.suggestions as suggestion}
						<li>
							{suggestion}
						</li>
					{/each}
				</ul>
			{/if}
			<label>
				Conferma password
				<input
					title="Conferma password"
					type="password"
					class="input"
					placeholder="Conferma la password"
					bind:value={confirmPassword}
					required
				/>
				<label>
					Email
					<input
						title="Input email"
						name="email"
						type="email"
						placeholder="abc@gmail.com"
						class="input {form?.email ? 'input-error' : ''}"
						required
					/>
				</label>
				<label>
					Nome
					<input
						title="Input first name"
						name="first_name"
						placeholder="Mario"
						class="input {form?.incorrect ? 'input-error' : ''}"
						required
					/>
				</label>
				<label>
					Cognome
					<input
						title="Input last name"
						name="last_name"
						placeholder="Rossi"
						class="input {form?.incorrect ? 'input-error' : ''}"
						required
					/>
				</label>
				<button
					formaction="?/signup"
					class="flex mt-4 btn variant-filled mx-auto w-1/2"
					disabled={valutation.score < 4 || confirmPassword != password}
				>
					Sign Up
				</button>
			</label>
		</form>
	</div>
	{#if form?.message}
		<div class="alert variant-filled-error" transition:fade|local={{ duration: 200 }}>
			<div class="alert-message">
				<p>{form?.message}</p>
			</div>
		</div>
	{/if}
</div>
