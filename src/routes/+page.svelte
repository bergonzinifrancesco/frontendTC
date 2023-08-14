<script lang="ts">
	import Structure from '$lib/Structure.svelte';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	export let data;
	export let form;

	$: {
		if (form?.ratingSuccess) {
			toastStore.trigger({
				message: `Recensione con voto ${form.rating} per la struttura n.${form.id}`,
				timeout: 1500
			});
		}
	}
</script>

<div class="flex flex-col p-10 gap-10 items-center">
	{#each data.structures as s}
		<Structure id={s.id} {...s.structure} rating={s.rating} isLogged={data.isLogged} />
	{/each}
</div>
