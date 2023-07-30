<script lang="ts">
	import { enhance } from '$app/forms';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { fade } from 'svelte/transition';

    const opzioni : Object = {
        POR: 'Portiere',
        DIF: 'Difensore',
        DIF_TER: 'Terzino',
        CEN: 'Centrocampista',
        CEN_ALA: 'Ala',
        CEN_TRQ: 'Trequartista',
        ATT: 'Attaccante',
        QLS: 'Qualsiasi'
    };

    export let positions : string[];
    export let error : string;
    export let success : boolean;
</script>

<div class="card w-3/4 mx-auto">
    <header class="card-header p-4">
        <h3 class="h3">Posizioni in campo</h3>
        <p>La prima posizione assegnata è la preferita.</p>
    </header>
    <section class="p-4">
        <form id="posizioni" method="post" action="?/uploadPositions" use:enhance>
            <input name="positions" type="text" multiple bind:value={positions} hidden/>
        </form>
        <ListBox multiple>
            {#each Object.entries(opzioni) as opzione}
                <ListBoxItem bind:group={positions} name="opzione" value={opzione[0]}>{opzione[1]}</ListBoxItem>
            {/each} 
        </ListBox>
    </section>
    <footer class="p-4">
        <button type="submit" class="btn variant-filled-primary w-full" form="posizioni">
            <h3 class="h3">Conferma modifica posizioni</h3>
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
