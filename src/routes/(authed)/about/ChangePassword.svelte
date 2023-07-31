<script lang="ts">
	import { enhance } from '$app/forms';
    import { ProgressBar, focusTrap } from "@skeletonlabs/skeleton";
    import { fade } from "svelte/transition";
    import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
    import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
    import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
    import * as zxcvbnItPackage from '@zxcvbn-ts/language-it';

    let password = "";
    let confirmPassword = "";

    const options = {
        translations: zxcvbnItPackage.translations,
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
            ...zxcvbnItPackage.dictionary
        }
    }
    zxcvbnOptions.setOptions(options);

    $: valutation = zxcvbn(password);
    export let error : string | undefined;
    export let success : boolean | undefined;
</script>

<div class="card w-3/4 mx-auto">
    <header class="card-header p-4">
        <h3 class="h3">Cambio Password</h3>
        <p>La nuova password dev'essere distinta da quella precedente.</p>
    </header>
    <section class="p-4">
        <form id="password" method="post" action="?/changePassword" use:enhance use:focusTrap={true}>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    bind:value={password}
                    placeholder="nuova password"
                    class="input"
                    required
                />
            </label>
            <label>
                Conferma password
                <input
                    name="confirmPassword"
                    type="password"
                    bind:value={confirmPassword}
                    placeholder="conferma nuova password"
                    class="input"
                    required
                />
            </label>
            <ProgressBar
                min={0}
                max={4}
                rounded="rounded"
                bind:value={valutation.score}
            />
            {#if valutation.feedback.warning}
                <p class="variant-soft-error">
                    {valutation.feedback.warning}
                </p>
            {/if}
            {#if valutation.feedback.suggestions}
                <ul class="list">
                    {#each valutation.feedback.suggestions as suggestion}
                        <li>
                            {suggestion}
                        </li>
                    {/each}
                </ul>
            {/if}
        </form>
    </section>
    <footer class="p-4">
        <button type="submit" class="btn variant-filled-primary w-full" form="password" disabled={(valutation.score < 4) || (password !== confirmPassword)}>
            <h3 class="h3">Conferma modifica password</h3>
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
                    <p>Password cambiata con successo.</p>
                </div> 
            </div>
        {/if}
    </footer>
</div>
