<script>
	import MyCalendar from '$lib/MyCalendar.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let data;
	export let form;
	$: structure = data?.structure;
	$: fields = data?.fields;
	let newEvents = [];
	let settings = {
		offset: 0,
		limit: 1,
		size: data?.fields.length,
		amounts: [1]
	};

	$: actualField = fields.slice(
		settings.offset * settings.limit,
		settings.offset * settings.limit + settings.limit
	)[0];

	$: actualBookings = data?.bookings.filter(
		(booking) => booking.num_campo == actualField.num_campo
	);

	$: costoCampo = actualField ? Number(actualField.costo_orario) : 0;
</script>

<div class="container flex flex-col gap-4 mx-auto mt-10">
	<h1 class="h1 mx-auto bg-secondary-300 mb-2 p-2">{structure.nome}</h1>
	{#if fields.length > 0}
		<div class="card w-full p-4 container grid grid-cols-4 justify-items-center">
			<h4 class="h4">Campo {actualField.num_campo}</h4>
			<div
				class="container grid grid-flow-col gap-4 content-center"
				title={'costo orario: ' + costoCampo}
			>
				<i class="fa-solid fa-dollar-sign fa-lg" />
				<i class="fa-solid fa-dollar-sign fa-lg" style={costoCampo < 5 ? 'color: #9ca1b0;' : ''} />
				<i class="fa-solid fa-dollar-sign fa-lg" style={costoCampo < 8 ? 'color: #9ca1b0;' : ''} />
			</div>
			<h4 class="h4">{actualField.tipo_superficie}</h4>
			<div class="container grid grid-cols-2 content-center">
				<i
					class={actualField.coperto
						? 'fa-solid fa-house-circle-check fa-2xl align-center'
						: 'fa-solid fa-house-circle-xmark fa-2xl align-center'}
					title={actualField.coperto ? 'coperto' : 'scoperto'}
				/>
				<i
					class="fa-solid fa-lightbulb fa-2xl"
					title={actualField.illuminato ? 'illuminato' : 'senza luce'}
					style={actualField.illuminato ? 'color: #d4ff00;' : ''}
				/>
			</div>
		</div>
		<Paginator
			bind:settings
			select="hidden"
			justify="justify-center"
			showPreviousNextButtons={true}
			showFirstLastButtons={true}
		/>
		<MyCalendar username={data.username} bookings={actualBookings} bind:newEvents />
		<form method="post" action="?/uploadChanges">
			<input hidden name="actualField" value={JSON.stringify(actualField)} />
			<input hidden name="newEvents" multiple value={JSON.stringify(newEvents)} />
			<button type="submit" class="btn variant-filled w-full p-4">
				<h3 class="h3">Conferma modifiche</h3>
			</button>
		</form>
		<Paginator
			bind:settings
			select="hidden"
			justify="justify-center"
			showPreviousNextButtons={true}
			showFirstLastButtons={true}
		/>
	{:else}
		<a href="/" class="h2 hover:text-primary-500 mx-auto"
			>La struttura non ha campi, torna alla home.</a
		>
	{/if}
</div>
