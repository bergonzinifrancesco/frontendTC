<script lang="ts">
	import { enhance } from '$app/forms';
	import LeafletMap from '$lib/LeafletMap.svelte';
	import { Ratings } from '@skeletonlabs/skeleton';

	export let id: Number;
	export let nome: string;
	export let fondazione: Date;
	export let lat: number;
	export let long: number;
	export let dimensione: Number;
	export let spogliatoi: boolean;
	export let rating: number;
	export let isLogged: boolean;

	let newRating: number = 0;
	$: data = JSON.stringify({ rating: newRating || rating, id: id });

	function cambiaRating(event: CustomEvent<{ index: number }>): void {
		if (isLogged) newRating = event.detail.index;
	}
</script>

<div
	class="flex flex-col rounded-lg bg-white dark:bg-neutral-700 sm:w-3/4 sm:text-center md:max-w-xl md:flex-row md:h-60"
>
	<div
		class="flex h-96 w-full rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg"
	>
		<LeafletMap {lat} {long} />
	</div>

	<div class="grid grid-rows-2 justify-center p-6 md:justify-start">
		<h4 class="h4 mb-2 md:w-48 w-full">
			{nome}
		</h4>
		<div class="grid grid-cols-2 pt-4 w-full">
			<p class="text-xs text-left text-neutral-500 dark:text-neutral-300">
				{#if fondazione}
					Since {fondazione}
				{:else}
					Since 0000
				{/if}
			</p>
			<p class="text-xs text-right text-neutral-500 dark:text-neutral-300">
				{#if dimensione}
					{dimensione} m<sup>2</sup>
				{:else}
					0000 m<sup>2</sup>
				{/if}
			</p>
			<div class="grid container justify-items-center">
				<form method="post" action="?/vote" use:enhance>
					<input type="text" hidden bind:value={data} name="data" />
					<button type="submit" disabled={!isLogged}>
						<Ratings bind:value={rating} max={5} interactive={isLogged} on:icon={cambiaRating}>
							<svelte:fragment slot="empty">
								<i class="fa-regular fa-star fa-xl" />
							</svelte:fragment>
							<svelte:fragment slot="half">
								<i class="fa-solid fa-star-half-stroke fa-xl" />
							</svelte:fragment>
							<svelte:fragment slot="full">
								<i class="fa-solid fa-star fa-xl" />
							</svelte:fragment>
						</Ratings>
					</button>
				</form>
			</div>
		</div>
		<a class="btn w-full inline-block variant-filled rounded-lg self-center" href="/{id}/booking">
			Prenota un campo
		</a>
	</div>
</div>
