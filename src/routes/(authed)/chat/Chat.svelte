<script lang="ts">
	import formatRelative from 'date-fns/formatRelative';
	import { it } from 'date-fns/locale';
	import type { Message } from './+page.server';
	import { afterUpdate } from 'svelte';

	export let username: string;
	export let roomId: number;
	export let messages: Message[] = [];

	let websocket: WebSocket;
	let currentMessage = '';
	let chatElement: HTMLElement;
	const scrollToBottom = async (element: HTMLElement): Promise<void> => {
		return element.scrollIntoView({ behavior: 'smooth' });
	};

	afterUpdate(() => {
		console.log('Aggiornamento interfaccia.');
		if (chatElement) {
			console.log(chatElement.scrollTop);
			console.log('scrolling chat block');
			scrollToBottom(chatElement);
		}
	});

	$: roomMessages = messages
		.filter((msg) => {
			return msg.room == roomId;
		})
		.sort((a, b) => {
			return a.time.getTime() - b.time.getTime();
		});

	$: {
		if (websocket) {
			websocket.close();
		}
		if (roomId >= 0) {
			websocket = openConnection(roomId, username);
		}
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

	function sendMessage() {
		console.log('Inside sendMessage');
		console.log('currentMessage', currentMessage);
		console.log('websocket', websocket);

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

	const formatDate = function (time: Date, reference: Date) {
		return formatRelative(time, reference, {
			weekStartsOn: 1, // lunedì
			locale: customLocale
		});
	};

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
		return formatDate(b.time, now);
	}
</script>

<div class="flex w-full flex-col p-4">
	{#if messages}
		<ul class="flex gap-6 flex-col overflow-x-hidden">
			{#each roomMessages as message, index}
				{#if index > 0 && getDayLabel(roomMessages.at(index - 1), message)}
					<p class="card p-4 mx-auto">
						{index > 0
							? getDayLabel(roomMessages.at(index - 1), message)
							: message.time.toLocaleDateString()}
					</p>
				{:else if index == 0}
					<p class="card p-4 mx-auto">
						{formatDate(message.time, new Date())}
					</p>
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
		<div class="p-4" bind:this={chatElement} />
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
	/>
	<div class="container w-12 variant-filled-primary">
		<button type="button" on:click={sendMessage} disabled={!currentMessage}>
			<i class="fa-regular fa-paper-plane" />
		</button>
	</div>
</div>
