<script>
	// https://svelte.dev/repl/5869cf5ae3b0401baf8b607f7f46caba?version=3.20.1
	// https://khromov.se/using-leaflet-with-sveltekit/

	import 'leaflet/dist/leaflet.css';
	import { onMount, onDestroy } from 'svelte';

	export let lat;
	export let long;

	let mapElement;
	let map;

	const mapOptions = {
		zoomControl: false,
		minZoom: 10,
		maxZoom: 15
	};

	onMount(async () => {
		const L = await import('leaflet');

		map = L.map(mapElement, mapOptions).setView([lat, long], 13);

		L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			maxZoom: 18
		}).addTo(map);

		L.marker([lat, long]).addTo(map);
	});

	onDestroy(async () => {
		if (map) {
			map.remove();
		}
	});
</script>

<div bind:this={mapElement} class="w-full h-full z-0" />
