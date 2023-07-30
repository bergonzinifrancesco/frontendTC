<script>
	import { enhance } from "$app/forms";
	import { focusTrap } from "@skeletonlabs/skeleton";
	import { fade } from "svelte/transition";
    export let form;
</script>

<div class="h-full flex flex-col items-center justify-center">
    <div class="card p-4">
        <form method="POST" action="?/login" use:enhance use:focusTrap={true}>
            <label>
                Username
                <input
                    title="Input username"
                    name="username"
                    class="input {form?.incorrect ? 'input-error' : ''}"
                    placeholder="user"
                    required
                />
            </label>
            <label>
                Password
                <input
                    title="Input password"
                    name="password"
                    type="password"
                    placeholder="your password"
                    class="input {form?.incorrect ? 'input-error' : ''}"
                    required
                />
            </label>
            <button
                formaction="?/login"
                class="btn variant-filled">
                Log In
            </button>
        </form>
    </div>
    {#if form?.incorrect}
        <div class="alert variant-filled-error" transition:fade|local={{duration: 200}}>
            <div class="alert-message">
                <p>Credenziali errate, riprova</p>
            </div> 
        </div>
    {/if}
</div>