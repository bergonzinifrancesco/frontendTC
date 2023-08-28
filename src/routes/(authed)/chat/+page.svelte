<script lang="ts">
	import Chat from './Chat.svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let form;
	$: username = data.username;
	$: rooms = data.rooms;
	$: messages = form?.messages ? form.messages : [];
	$: selectedRoom = form?.room !== undefined ? form.room : -1;

	$: console.log('selectedRoom', selectedRoom);
</script>

<div class="flex">
	<div class="w-1/3 border border-r-8 h-screen">
		<ul class="w-full space-y-1 sticky top-0">
			{#each rooms as room}
				<div>
					<form method="post" action="?/getMessages" use:enhance>
						<input hidden name="room" bind:value={room.id} type="number" />
						<button type="submit" class="w-full">
							<li
								class={'h-20 flex items-center text-center space-x-4' +
									(selectedRoom == room.id ? ' p-2 bg-secondary-900-50-token' : ' ml-4')}
							>
								<h4
									class={'h4 text-left' +
										(selectedRoom == room.id ? ' font-bold text-secondary-50-900-token' : '')}
								>
									{room.nome}
								</h4>
							</li>
						</button>
					</form>
					<hr />
				</div>
			{/each}
		</ul>
	</div>
	<div class="container w-2/3 overflow-auto max-h-screen hide-scrollbar">
		<Chat roomId={selectedRoom} {username} {messages} />
	</div>
</div>
