<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';	

	import {AppShell, AppBar, Avatar, modalStore, type ModalSettings, Modal} from '@skeletonlabs/skeleton';
	export let data;

	$: isLogged = data?.isLogged;

	const modals:ModalSettings = {
		type: 'confirm',
		title: 'Log Out',
		body: 'Vuoi davvero uscire?',
		response: async (r:boolean) => {
			const response = await fetch('/', {
				method: 'delete'
			});
			isLogged = await response.json();
		}
	};

	$: avatarBorder = "border-2 border-surface-900-50-token" + (isLogged ? " hover:!border-primary-500" : "");
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault='place-self-center' slotTrail='place-content-end'>
			<svelte:fragment slot='lead'>N</svelte:fragment>
				<a href='/' class="h1">Sito calcetto</a>
			<svelte:fragment slot='trail'>
				{#if isLogged}
				<button on:click={() => modalStore.trigger(modals)} class="h3">
					Log Out
				</button>
				{:else}
				<a href='/login' class="h3">
					Log In
				</a>
				<a href='/signup' class="h3">
					Sign Up
				</a>
				{/if}
				<a href='/about'>
					<Avatar
						src="/user-solid.svg"
						width="w-12"
						bind:border={avatarBorder}
						cursor="cursor-pointer"
						background="bg-transparent"
					/>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
