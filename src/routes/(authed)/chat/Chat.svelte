<script lang="ts">
	import formatRelative from 'date-fns/formatRelative';
	import { it } from 'date-fns/locale';

	export let username: string;
	export let roomId: number;

	interface Message {
		room: number;
		username: string;
		message: string;
		time: Date;
	}

	const formatRelativeLocale = {
		lastWeek: 'EEEE',
		yesterday: "'ieri'",
		today: "'oggi'",
		tomorrow: "'domani'",
		nextWeek: 'prossimo EEEE',
		other: 'L LT' // Difference: Add time to the date
	};

	const customLocale = {
		...it,
		formatRelative: (token) => formatRelativeLocale[token]
	};

	let websocket: WebSocket;
	let messages: Message[] = [
		{
			message: 'Ciaooo sono un pirla',
			username: 'nicolo',
			room: 0,
			time: new Date(2023, 7, 10, 15, 0)
		},
		{
			message: 'Ciaooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
			username: 'francesco',
			room: 0,
			time: new Date(2023, 7, 25, 18, 0)
		}
	];

	$: roomMessages = messages
		.filter((msg) => {
			return msg.room == roomId;
		})
		.sort((a, b) => {
			return a.time.getTime() - b.time.getTime();
		});

	let currentMessage = '';

	function testMessaggio() {
		if (websocket && currentMessage) {
			websocket.send(JSON.stringify({ message: currentMessage }));
			currentMessage = '';
		}
		return null;
	}

	function openConnection(room: number, username: string): WebSocket {
		const ws = new WebSocket(`ws://localhost:8000/chat/${room}/?${username}`);
		ws.onopen = function (e) {
			console.log('Connesso al server', e);
		};
		ws.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const message: Message = {
				username: data.username,
				room: parseInt(data.room),
				message: data.message,
				time: new Date(data.time)
			};
			console.log('Nuovo messaggio', message);
			messages = [...messages, message];
		};
		ws.onclose = function () {
			console.log('Connessione interrotta');
		};
		return ws;
	}

	$: {
		if (websocket) {
			websocket.close();
		}
		websocket = openConnection(roomId, username);
	}
	$: console.log('roomMessages', roomMessages);
	$: console.log('messages', messages);

	function getDayLabel(a: Message | undefined, b: Message | undefined): string {
		if (!a || !b) {
			return '';
		}

		const aTime = a.time.getTime();

		const nextAMidnight = new Date(aTime).setHours(24, 0, 0, 0); // prossima mezzanotte

		const bTime = b.time.getTime();

		const now = new Date();
		if (aTime > bTime || nextAMidnight > bTime || bTime > now.getTime()) {
			return '';
		}

		return formatRelative(b.time, now, {
			weekStartsOn: 1, // lunedì
			locale: customLocale
		});
	}
</script>

<div class="flex w-full flex-col p-4">
	{#if messages}
		<p>Messaggi ricevuti finora:</p>
		<ul class="flex gap-6 flex-col overflow-x-hidden">
			{#each roomMessages as message, index}
				{#if index > 0 && getDayLabel(roomMessages.at(index - 1), message)}
					<p class="card p-4 mx-auto">
						{index > 0
							? getDayLabel(roomMessages.at(index - 1), message)
							: message.time.toLocaleDateString()}
					</p>
				{:else if index == 0}
					<p class="card p-4 mx-auto">{message.time.toLocaleDateString()}</p>
				{/if}
				<li
					class={'card pt-4 px-4 pb-2 max-w-sm text-left' +
						(message.username == username
							? ' bg-secondary-800 place-self-end rounded-br-lg text-secondary-100'
							: ' rounded-bl-lg place-self-start')}
				>
					{#if message.username !== username}
						<header class="class-header text-primary-500/60">
							{message.username}
						</header>
					{/if}
					<section class="text-lg break-words">{message.message}</section>
					<div
						class={'text-end mr-2 align-text-bottom ' +
							(message.username == username ? 'text-secondary-200/50' : 'text-primary-500/50')}
					>
						{message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</div>
				</li>
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
