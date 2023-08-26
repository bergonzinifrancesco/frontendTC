<script lang="ts">
	import { onMount } from 'svelte';

	export let username: string;

	let websocket: WebSocket;
	let messages: string[] = [];
	let currentMessage = '';

	onMount(() => {
		websocket = new WebSocket(`ws://localhost:8000/chat/0/?${username}`);
		websocket.onopen = function (e) {
			console.log('Connesso al server', e);
		};
		websocket.onmessage = function (e) {
			console.log('Messaggio ricevuto', e);
			messages = [...messages, JSON.parse(e.data).message];
		};
		websocket.onclose = function (e) {
			console.log('Connessione interrotta');
		};
	});

	function testMessaggio() {
		if (websocket && currentMessage) {
			websocket.send(JSON.stringify({ message: currentMessage }));
			currentMessage = '';
		}
		return null;
	}
</script>

<div class="w-full">
	{#if messages}
		<p>Messaggi ricevuti finora:</p>
		<ul>
			{#each messages as message}
				<li>{message}</li>
			{/each}
		</ul>
	{/if}
</div>
<div
	class="container mx-auto flex flex-row fixed bottom-0 w-2/3 input-group input-group-divider rounded-container-token"
>
	<textarea
		bind:value={currentMessage}
		class="bg-transparent border-0 ring-0 w-full"
		placeholder="Scrivi un messaggio..."
		rows={1}
		on:keyup={(e) => {
			if (e.key == 'Enter') {
				currentMessage = currentMessage.replace('\n', '');
				testMessaggio();
				return;
			}
		}}
	/>
	<div class="container w-12 variant-filled-primary">
		<button on:click={testMessaggio()} disabled={!currentMessage}>
			<i class="fa-regular fa-paper-plane" />
		</button>
	</div>
</div>
