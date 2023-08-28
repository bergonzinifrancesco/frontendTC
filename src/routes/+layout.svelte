<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import {
		AppShell,
		AppBar,
		Avatar,
		AppRail,
		AppRailAnchor,
		LightSwitch,
		Toast
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { page } from '$app/stores';

	export let data;

	$: isLogged = data?.isLogged;
	$: avatarPath = data?.avatarPath;
	$: isSuperUser = data?.isSuperUser;

	$: avatarBorder =
		'border-2 border-surface-900-50-token' + (isLogged ? ' hover:!border-primary-500' : '');

	let sidebarIsOpen: boolean = false;
</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button
					class="btn-icon-sm"
					type="button"
					on:click={() => (sidebarIsOpen = sidebarIsOpen ? false : true)}
				>
					<img src="/bars-solid.svg" alt="hamburger" />
				</button>
			</svelte:fragment>
			<a href="/" class="h1">Sito calcetto</a>
			<svelte:fragment slot="trail">
				{#if isLogged}
					{#if isSuperUser}
						<LightSwitch />
					{/if}
					<form method="post" action="/login?/logout">
						<button type="submit" class="h3"> Log Out </button>
					</form>
				{:else}
					<a href="/login" class="h3"> Log In </a>
					<a href="/signup" class="h3"> Sign Up </a>
				{/if}
				<a href="/about">
					<Avatar
						src={isLogged ? avatarPath : '/user-solid.svg'}
						width="w-12"
						bind:border={avatarBorder}
						cursor="cursor-pointer"
						background="bg-transparent"
					/>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if sidebarIsOpen}
			<AppRail width="w-48" gap="gap-4">
				<h4 class="h4">Chat</h4>
				<AppRailAnchor href="/chat">Entra in chat</AppRailAnchor>
				<h4 class="h4">Admin struttura</h4>
				<AppRailAnchor
					href="/gestione-calendario"
					selected={$page.url.pathname === '/gestione-calendario'}
					>Gestione calendario</AppRailAnchor
				>
				<AppRailAnchor
					href="/modifica-struttura"
					selected={$page.url.pathname === '/modifica-struttura'}
					>Modifica scheda struttura</AppRailAnchor
				>

				{#if isSuperUser}
					<h4 class="h4">Admin sito</h4>
					<AppRailAnchor href="/modifica-tema" selected={$page.url.pathname === '/modifica-tema'}
						>Modifica tema del sito</AppRailAnchor
					>
					<AppRailAnchor href="/assegna-utenti" selected={$page.url.pathname === '/assegna-utenti'}
						>Assegna utenti alle strutture</AppRailAnchor
					>
					<AppRailAnchor
						href="/admin-strutture"
						selected={$page.url.pathname === '/admin-strutture'}
						>Visualizza admin delle strutture</AppRailAnchor
					>
					<AppRailAnchor
						href="/rimuovi-struttura"
						selected={$page.url.pathname === '/rimuovi-struttura'}>Rimuovi struttura</AppRailAnchor
					>
				{/if}
			</AppRail>
		{/if}
	</svelte:fragment>

	<div class="w-full h-full">
		<slot />
	</div>
</AppShell>
