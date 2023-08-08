<script lang="ts">
	import Structure from "$lib/Structure.svelte";
  export let data;
</script>

<div class="flex flex-col p-10 gap-10 items-center">
  {#each data.structures as s}
    <Structure id={s.id} {...s.structure}/>
  {/each}
</div>