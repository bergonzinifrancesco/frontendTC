<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';	

	import {AppShell, AppBar, Avatar} from '@skeletonlabs/skeleton';
	import {redirect} from '@sveltejs/kit';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault='place-self-center' slotTrail='place-content-end'>
			<svelte:fragment slot='lead'>N</svelte:fragment>
				<a href='/'>Sito calcetto</a>
			<svelte:fragment slot='trail'>
				<a href='/login'>
					Log In
				</a>
				<a href='/signup'>
					Sign Up
				</a>
				<a href='/about'>
					<Avatar
						src="/account.png"
						border='border-4 border-surface-300-600-token hover:!border-primary-500'
						cursor="cursor-pointer"
						background="bg-secondary-500"
					/>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
