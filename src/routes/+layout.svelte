<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';	

	import {AppShell, AppBar, Avatar} from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault='place-self-center' slotTrail='place-content-end'>
			<svelte:fragment slot='lead'>N</svelte:fragment>
			Sito calcetto
			<svelte:fragment slot='trail'>
				<Avatar src="https://www.flaticon.com/free-icons/user">
				</Avatar>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
