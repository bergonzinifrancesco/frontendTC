<script lang="ts">
	import { enhance } from "$app/forms";
	import { FileButton } from "@skeletonlabs/skeleton";

    export let avatarPath : string;
    export let limitSize : number;

    let files:FileList;

    function onChangeHandler(e: Event): void {
	    console.log('file data:', e);
    }
</script>

<div class="card self-center w-1/2">
    <header class="card-header p-4">
        <h3 class="h3">Avatar utente</h3>
        <p>Dimensione massima: {limitSize} Kb</p>
    </header>
    <section class="p-4">
        <img src={avatarPath} alt="avatar" class="mx-auto p-4 card card-hover"/> 
    </section>
    <footer class="card-footer">
        <FileButton
        name="avatarUpload"
        bind:files={files}
        width="w-full"
        on:change={onChangeHandler}
        >
            Upload nuovo avatar
        </FileButton>
    </footer>
</div>