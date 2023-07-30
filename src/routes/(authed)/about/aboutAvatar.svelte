<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import { FileButton } from '@skeletonlabs/skeleton';

    export let avatarPath: string;
    export let fileSize: number;
    export let error;
    export let success;
    let files : FileList;
</script>

<div class="card w-3/4 mx-auto">
    <header class="card-header p-4">
        <h3 class="h3">Avatar utente</h3>
        <p>Dimensione massima: {fileSize} Kb</p>
    </header>
    <section class="p-4">
        <form method="post" action="?/uploadAvatar" use:enhance>
            <input name="fileSize" type="number" value={fileSize} hidden/>
            <FileButton
                name="file"
                button="btn"
                bind:files
                accept="image/*"
                width="w-full"
                formaction="?/uploadAvatar"
            >
            <img src={avatarPath} alt="avatar" class="card card-hover" />
            </FileButton>
            <button type="submit" class="btn variant-filled-primary w-full my-4">
                <h3 class="h3">Conferma invio</h3>
            </button>
        </form>
    </section>
    <footer>
        {#if error}
            <div class="alert variant-filled-error" in:fade|once={{delay: 200, duration: 500}}>
                <div class="alert-message">
                    <p>{error}</p>
                </div> 
            </div>
        {:else if success}
            <div class="alert variant-filled-success" in:fade|once={{delay: 200, duration: 500}}>
                <div class="alert-message">
                    <p>Immagine caricata con successo.</p>
                </div> 
            </div>
        {/if}
    </footer>
</div>
