<script>
	import { enhance } from "$app/forms";
    export let form;
</script>

<form method="POST" action="?/login" use:enhance>
    <label>
        <input
            id="username"
            name="username"
            class={form?.incorrect ? 'input-error' : ''}
            required
        />
    </label>
    <label>
        <input
            id="password"
            name="password"
            type="password"
            class={form?.incorrect ? 'input-error' : ''}
            required
        />
    </label>
    <button>
        Log In
    </button>
</form>