<script>
	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import Interaction from '@event-calendar/interaction';

	export let username;
	export let bookings;
	export let newEvents;

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
			console.log('Sono in eventClick,', info);
		},
		select: function (info) {
			console.log('Sono in select,', info);
			let event = {
				id: bookings.length,
				title: username,
				titleHTML: `<b>${username}</b>`,
				start: info.start,
				end: info.end,
				editable: false,
				backgroundColor: '#FF8F5C',
				textColor: '#000000'
			};
			if (!validateEvent(event, bookings)) {
				console.log("Impossibile aggiungere l'evento", event);
			} else {
				calendar.addEvent(event);
				bookings.push(event);
				bookings = [...bookings];
				newEvents = [...newEvents, event];
				console.log('nuovo evento aggiunto');
				console.log('newEvents', newEvents);
				console.log('bookings', bookings);
				console.log('calendar', calendar);
			}
		},
		eventResize: function (info) {
			console.log('eventResize,', info);

			let oldEventIndex = bookings.findIndex((event) => {
				return event.id === info.oldEvent.id;
			});

			if (oldEventIndex > -1) {
				bookings.splice(oldEventIndex, 1, info.event);
			}
		},
		eventStartEditable: false,
		firstDay: 1, // Lunedì
		locale: 'it-IT',
		events: bookings
	};

	function validateEvent(event, events) {
		console.log('event', event);
		const hourInMs = 1000 * 60 * 60;
		const duration = event.end - event.start;

		if (duration < hourInMs) {
			console.log('Prenotazione più breve di 1 ora.');
			return false;
		}

		if (event.end.getDay() > event.start.getDay()) {
			console.log('Evento su due giorni, non si può aggiungere.');
			return false;
		}
		const sameDayEvents = events.filter((e) => e.start.getDay() == event.start.getDay());
		for (const e of sameDayEvents) {
			if (
				(event.start <= e.start && event.end > e.start) ||
				(event.start < e.end && event.end >= e.end)
			) {
				console.log('Evento sovrapposto ad uno già esistente.');
				return false;
			}
		}
		return true;
	}

	function deleteLastEvent() {
		if (!newEvents.length) {
			console.log('Non ci sono eventi da cancellare.');
			return false;
		}

		const lastEvent = newEvents.pop();
		const indexInBookings = bookings.indexOf(lastEvent);

		if (lastEvent == -1) {
			console.log("Evento da cancellare non trovato nell'elenco.");
			return false;
		}

		bookings.splice(indexInBookings, 1);
		calendar.removeEventById(lastEvent.id);
		return true;
	}
	$: console.log('bookings', bookings);
</script>

<div class="flex container flex-col bg-white p-10">
	<Calendar bind:this={calendar} {plugins} {options} />
	<button
		type="button"
		class="btn variant-outline-secondary h-full mt-6"
		on:click={() => deleteLastEvent()}
	>
		<h3 class="h3">Elimina ultimo evento aggiunto</h3>
	</button>
</div>
