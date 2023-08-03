<script lang="ts">
	import LeafletMap from "$lib/LeafletMap.svelte";
  
  export let id : Number;
  export let nome : string;
  export let fondazione : Date;
  export let lat : number;
  export let long : number;
  export let dimensione : Number;
  export let spogliatoi : boolean;

</script>

<div class="flex flex-col rounded-lg bg-white dark:bg-neutral-700 sm:w-3/4 sm:text-center md:max-w-xl md:flex-row md:h-60">
  
  <div class="h-96 w-full rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg">
    <LeafletMap lat={lat} long={long} />
  </div>
  
  <div class="grid grid-rows-3 justify-center md:justify-start p-6">
    <h4
      class="h4 mb-2 md:w-48 w-full">
      {nome}
    </h4>
    <div class="grid grid-cols-2 pt-4">
      <p class="text-xs text-left text-neutral-500 dark:text-neutral-300">
        {#if fondazione}
          Since {fondazione}
        {:else}
          Since 0000
        {/if}
      </p>
      <p class="text-xs text-right text-neutral-500 dark:text-neutral-300">
        {#if dimensione}
          {dimensione} m<sup>2</sup>
        {:else}
          0000 m<sup>2</sup>
        {/if}
      </p>
    </div>
    <a
      class="btn w-full inline-block variant-filled rounded-lg"
      href="/{id}/booking"
    >
      Prenota un campo
    </a>
  </div>

</div>