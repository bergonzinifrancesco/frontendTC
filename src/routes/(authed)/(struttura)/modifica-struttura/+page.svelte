<script>
	import { Paginator } from '@skeletonlabs/skeleton';
	import FormStruttura from './FormStruttura.svelte';

	export let data;

	let settings = {
		offset: 0,
		limit: 1,
		size: data?.structures.length,
		amounts: [1]
	};

	$: strutturaAttuale = data.structures.slice(
		settings.offset * settings.limit,
		settings.offset * settings.limit + settings.limit
	)[0];
</script>

<div class="container flex flex-col place-content-center mx-auto p-4 gap-6">
	<Paginator
		bind:settings
		select="hidden"
		justify="justify-center"
		showPreviousNextButtons={true}
		showFirstLastButtons={true}
	/>
	<FormStruttura {...strutturaAttuale} />
</div>
