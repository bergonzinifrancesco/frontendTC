<script>
	import { page } from '$app/stores';
	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: structure = data.structure;
	$: bookings = data.bookings;
	$: events = data.events;

	let selectedEvent = null;
	let calendar;
	let plugins = [TimeGrid, Interaction];

	$: options = {
		allDaySlot: false,
		view: 'timeGridWeek',
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'timeGridWeek,timeGridDay'
		},
		scrollTime: '09:00:00',
		slotDuration: '00:15:00',
		views: {
			timeGridWeek: { pointer: true }
		},
		dayMaxEvents: true,
		nowIndicator: true,
		selectable: true,
		buttonText: function (text) {
			return {
				...text,
				today: 'Oggi',
				timeGridDay: 'Giorno',
				timeGridWeek: 'Settimana'
			};
		},
		dateClick: function (info) {
			console.log('Sono in dateClick,', info);
		},
		eventClick: function (info) {
			if (selectedEvent && selectedEvent.id === info.event.id && info.event.editable) {
				console.log('Rimozione di evento: ', info.event);
				calendar = calendar.removeEventById(selectedEvent.id);
				events?.splice(events.indexOf(selectedEvent), 1);
			}
			selectedEvent = info.event;

			calendar.updateEvent(info.event.id);

			console.log('Sono in eventClick,', info);
			console.log('selectedEvent', selectedEvent);
		},
		eventDrop: function (info) {
			console.log('eventDrop', info);
			if (new Date(info.event.start) > new Date()) {
				calendar = calendar.updateEvent(info.event);
			} else {
				info.revert();
			}
		},
		select: function (info) {
			console.log('select');
		},
		eventResize: function (info) {
			console.log('eventResize,', info);
			if (!events || !events.length) {
				console.log('Non ci sono eventi da ridimensionare.');
				return;
			}
			let oldEventIndex = events.findIndex((event) => {
				return event.id === info.oldEvent.id;
			});
			if (oldEventIndex > -1) {
				events.splice(oldEventIndex, 1, info.event);
			}

			bookings.splice(bookings.indexOf(info.oldEvent.id), 1);

			calendar = calendar.updateEvent(info.event);
		},
		editable: false,
		eventStartEditable: false,
		eventDurationEditable: false,
		firstDay: 1, // Lunedì
		locale: 'it-IT',
		events: events
	};

	function deleteLastEvent() {
		if (!events || !events.length) {
			console.log('Non ci sono eventi da cancellare.');
			return false;
		}

		const lastEvent = events.pop();

		if (!lastEvent) {
			console.log("Evento da cancellare non trovato nell'elenco.");
			return false;
		}
		events = [...events];
		calendar.removeEventById(lastEvent.id);
		return true;
	}

	$: calendarEvents = calendar ? calendar.getEvents() : null;
</script>

<div class="container flex flex-col m-4 p-4">
	<h2 class="h2">{structure.nome} (id: {$page.params.id})</h2>
	<h4 class="h4">Doppio click su un evento per rimuoverlo.</h4>
	<h4 class="h4 text-secondary-500">
		Verranno registrate solo le modifiche sugli eventi a partire dalla data attuale.
	</h4>
</div>
<div class="flex container mx-auto flex-col bg-white p-10">
	<Calendar bind:this={calendar} {plugins} {options} />
	<button
		type="button"
		class="btn variant-outline-secondary h-full mt-6"
		on:click={() => deleteLastEvent()}
	>
		<h3 class="h3">Elimina ultimo evento aggiunto</h3>
	</button>
</div>
<form method="post" class="mx-auto flex container w-full h-full p-4" use:enhance>
	<input hidden name="events" value={JSON.stringify(calendarEvents ? calendarEvents : [])} />
	<button type="submit" class="btn variant-filled w-full">
		<h3 class="h3">Conferma modifiche al calendario</h3>
	</button>
</form>

<div class="container flex mx-auto w-full h-full text-center">
	{#if form?.success}
		<h2 class="h2">Hai aggiornato il calendario.</h2>
	{:else if form?.error}
		<h2 class="h2 text-error-500">
			{form?.error.message ?? 'Impossibile aggiornare il calendario.'}
		</h2>
	{/if}
</div>
