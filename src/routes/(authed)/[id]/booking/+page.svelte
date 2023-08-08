<script>
	import MyCalendar from '$lib/MyCalendar.svelte';

  export let data;
  $: structure = data?.structure;

</script>

<div class="container flex flex-col gap-4 mx-auto mt-10">
  <h1 class="h1">{structure.nome}</h1>
  <MyCalendar/>
</div>