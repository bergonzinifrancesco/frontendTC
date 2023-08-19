<script lang="ts">
	import { enhance } from '$app/forms';
	import Structure from '$lib/Structure.svelte';
	import {
		Accordion,
		AccordionItem,
		ListBox,
		ListBoxItem,
		SlideToggle,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	export let data;
	export let form;

	onMount(() => {
		const geoloc = navigator.geolocation;
		geoloc.getCurrentPosition(
			(success) => {
				geocords = success;
			},
			(error) => {
				console.log(error);
			},
			{
				enableHighAccuracy: true
			}
		);
	});

	$: structures = form?.structures ? form.structures : data.structures;
	$: filter = form?.filter ? form?.filter : null;
	$: console.log('Filtro', filter);

	$: {
		if (form?.ratingSuccess) {
			toastStore.trigger({
				message: `Recensione con voto ${form.rating} per la struttura n.${form.id}`,
				timeout: 1500
			});
		}
	}

	let geocords = '';

	$: posizione =
		filter && filter.coordinates
			? filter.coordinates
			: geocords
			? [geocords.coords.latitude, geocords.coords.longitude]
			: [];

	let superfici = filter && filter.campo ? filter.campo : [];
	let costo = filter && filter.costo ? filter.costo : '';
	let ordine = filter && filter.ordine ? filter.ordine : 'vicinanza';
	let isRated = filter ? JSON.parse(filter.is_rated) : false;

	$: inputSuperfici = superfici ? JSON.stringify(superfici) : JSON.stringify([]);
	$: inputPosizione = posizione ? JSON.stringify(posizione) : JSON.stringify([]);

	let test = [];
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<p class="card p-4">Filtri di ricerca</p>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="card container gap-6 mx-auto p-4 w-full">
				<h4 class="h4 mx-auto text-center p-4">Tipi di superficie</h4>
				<ListBox multiple class="card border-spacing-2 container w-full mx-auto p-4 border-4">
					<ListBoxItem bind:group={superfici} name="medium" value="cemento">Cemento</ListBoxItem>
					<ListBoxItem bind:group={superfici} name="medium" value="parquet">Parquet</ListBoxItem>
					<ListBoxItem bind:group={superfici} name="medium" value="naturale">Naturale</ListBoxItem>
					<ListBoxItem bind:group={superfici} name="medium" value="sintetico">Sintetico</ListBoxItem
					>
					<ListBoxItem bind:group={superfici} name="medium" value="palestra">Palestra</ListBoxItem>
				</ListBox>
				<h4 class="h4 mx-auto text-center p-4">Costo</h4>
				<ListBox class="card container w-full mx-auto p-4 border-4">
					<ListBoxItem bind:group={costo} name="medium" value="economico">Economico</ListBoxItem>
					<ListBoxItem bind:group={costo} name="medium" value="medio">Medio</ListBoxItem>
					<ListBoxItem bind:group={costo} name="medium" value="costoso">Costoso</ListBoxItem>
					<ListBoxItem bind:group={costo} name="medium" value="">Qualunque</ListBoxItem>
				</ListBox>
				<h4 class="h4 mx-auto text-center p-4">Ordina per</h4>
				<ListBox class="card container w-full mx-auto p-4 border-4">
					<ListBoxItem bind:group={ordine} name="medium" value="vicinanza"
						>Vicinanza geografica</ListBoxItem
					>
					<ListBoxItem bind:group={ordine} name="medium" value="rating_desc"
						>Valutazione desc.</ListBoxItem
					>
					<ListBoxItem bind:group={ordine} name="medium" value="rating"
						>Valutazione asc.</ListBoxItem
					>
					<ListBoxItem bind:group={ordine} name="medium" value="prezzo">Prezzo asc.</ListBoxItem>
					<ListBoxItem bind:group={ordine} name="medium" value="prezzo_desc"
						>Prezzo desc.</ListBoxItem
					>
				</ListBox>
				<div class="flex flex-row gap-4 p-10">
					<h4 class="h4">Solo strutture con valutazione</h4>
					<SlideToggle name="isRated" bind:checked={isRated} />
				</div>
				<form method="post" action="?/filter" use:enhance>
					<input type="text" hidden name="superfici" bind:value={inputSuperfici} />
					<input type="text" hidden name="costo" bind:value={costo} />
					<input hidden name="isRated" bind:value={isRated} />
					<input type="text" hidden name="ordine" bind:value={ordine} />
					<input type="text" hidden name="geocords" bind:value={inputPosizione} />
					<button class="btn variant-filled p-4 w-full mx-auto" type="submit">
						<h4 class="h4">Conferma filtri di ricerca</h4>
					</button>
				</form>
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
<div class="flex flex-col p-10 gap-10 items-center">
	{#if structures.length > 0}
		{#each structures as s}
			<Structure id={s.id} {...s.structure} rating={s.rating} isLogged={data.isLogged} />
		{/each}
	{:else}
		<h3 class="h3">Non ci sono strutture da mostrare.</h3>
	{/if}
</div>
