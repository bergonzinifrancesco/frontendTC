<script lang="ts">
	import Structure from "$lib/Structure.svelte";
	import { identity } from "svelte/internal";

  export let data;
</script>

<div class="flex flex-col p-4 gap-4 items-center">
  {#each data.structures as s}
    <Structure id={s.id} {...s.structure}/>
  {/each}
</div>