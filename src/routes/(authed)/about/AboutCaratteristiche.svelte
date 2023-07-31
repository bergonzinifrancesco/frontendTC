<script lang="ts">
	import { enhance } from '$app/forms';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { fade } from 'svelte/transition';

    const opzioni : Object = {
        veloce: "Veloce",
        agile: "Agile",
        tecnico: "Tecnico",
        fisico: "Fisico",
        tattico: "Tattico",
        acrobata: "Acrobata"
    };

    export let characteristics : string[];
    export let error : string;
    export let success : boolean | undefined;
</script>

<div class="card w-3/4 mx-auto">
    <header class="card-header p-4">
        <h3 class="h3">Caratteristiche di gioco</h3>
        <p>Selezionane esattamente 3.</p>
    </header>
    <section class="p-4">
        <form id="caratteristiche" method="post" action="?/uploadCharacteristics" use:enhance>
            <input name="characteristics" type="text" multiple bind:value={characteristics} hidden/>
        </form>
        <ListBox multiple>
            {#each Object.entries(opzioni) as opzione}
                <ListBoxItem bind:group={characteristics} name="opzione" value={opzione[0]}>{opzione[1]}</ListBoxItem>
            {/each} 
        </ListBox>
    </section>
    <footer class="p-4">
        <button type="submit" class="btn variant-filled-primary w-full" form="caratteristiche" disabled={characteristics.length === 0}>
            <h3 class="h3">Conferma modifica caratteristiche</h3>
        </button>
        {#if error}
            <div class="alert variant-filled-error" in:fade|once={{delay: 200, duration: 500}}>
                <div class="alert-message">
                    <p>{error}</p>
                </div> 
            </div>
        {:else if success}
            <div class="alert variant-filled-success" in:fade|once={{delay: 200, duration: 500}}>
                <div class="alert-message">
                    <p>Posizioni caricate con successo.</p>
                </div> 
            </div>
        {/if}
    </footer>
</div>
