<script lang="ts">
	import Structure from "$lib/Structure.svelte";
	import { identity } from "svelte/internal";

  export let data;
</script>

{#each data.structures as s}
  <Structure id={s.id} {...s.structure}/>
{/each}