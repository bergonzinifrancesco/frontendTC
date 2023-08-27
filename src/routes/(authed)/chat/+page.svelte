<script lang="ts">
	import { onMount } from 'svelte';
	import { faker } from '@faker-js/faker/locale/it';
	import Chat from './Chat.svelte';

	export let data;
	$: username = data.username;

	let names: string[] = [];

	onMount(() => {
		for (let i = 0; i < 40; i++) {
			names = [...names, faker.person.fullName()];
		}
	});

	let selectedRoom = 0;
</script>

<div class="flex">
	<div class="overflow-auto w-1/3 border border-r-8 h-screen">
		<ul class="w-full space-y-1">
			{#each names as name, id}
				<div>
					<button
						on:click={() => {
							selectedRoom = id;
						}}
						class="w-full"
					>
						<li
							class={'h-20 flex items-center text-center space-x-4' +
								(selectedRoom == id ? ' p-2 bg-secondary-100' : ' ml-4')}
						>
							<h4 class={'h4' + (selectedRoom == id ? ' font-bold' : '')}>
								{name}
							</h4>
						</li>
					</button>
					<hr />
				</div>
			{/each}
		</ul>
	</div>
	<div class="container overflow-auto w-2/3">
		<Chat bind:roomId={selectedRoom} {username} />
	</div>
</div>
