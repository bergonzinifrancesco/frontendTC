<script>
	import MyCalendar from '$lib/MyCalendar.svelte';

	export let data;
	$: structure = data?.structure;

	async function uploadChanges(events, username) {
		let goodEvents = events.filter((event) => event.title === username);

		for (const e of goodEvents) {
			const response = await fetch(`/[id]/booking`, {
				method: 'POST'
			});
			console.log('response inside uploadChanges', response);
		}
	}
</script>

<div class="container flex flex-col gap-4 mx-auto mt-10">
	<h1 class="h1">{structure.nome}</h1>
	<MyCalendar username={data.username} bookings={data.bookings} {uploadChanges} />
</div>
