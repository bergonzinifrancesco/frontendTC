<script>
    import {enhance} from '$app/forms';
</script>

<p>Vuoi davvero effettuare il logout?</p>
<form method="post" action="?/logout" use:enhance>
    <button name="confirm logout">
        Si
    </button>
</form>
