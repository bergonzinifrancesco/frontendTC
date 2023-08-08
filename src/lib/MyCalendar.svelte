<script>
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import Interaction from '@event-calendar/interaction';

  export let events = [
    {
      id: 1,
      title: 'esempio',
      start: new Date(),
      end: new Date(2023,7,8,18,0),
    }
  ];
  export let uploadChanges = () => {};

  let calendar;
  let plugins = [TimeGrid, Interaction];
  let options = {
    allDaySlot: false,
    view: 'timeGridWeek',
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'timeGridWeek,timeGridDay'
    },
    scrollTime: '09:00:00',
    views: {
      timeGridWeek: {pointer: true}
    },
    dayMaxEvents: true,
    nowIndicator: true,
    selectable: true,
    buttonText: function (text) {
      return {
      ...text,
      today: 'Oggi',
      timeGridDay: 'Giorno',
      timeGridWeek: 'Settimana',
      next: 'Prossima settimana',
      prev: 'Settimana precedente'
    }},
    dateClick: (info) => {
      console.log("Sono stato cliccato", info);
    },
    eventClick: (info) => {
      console.log(info);
    },
    select: function(info) {
      console.log(info);
    },
    eventStartEditable: false,
    firstDay: 1, // Lunedì
    locale: 'it-IT',
    events: events,
  };
</script>

<div class="flex container flex-col bg-white p-10">
  <Calendar bind:this={calendar} {plugins} {options} />
  <button type="button" class="btn variant-filled h-full mt-6">
    <h3 class="h3">Conferma modifiche</h3>
  </button>
</div>