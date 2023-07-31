<script lang='ts'>
  import AboutAvatar from "./AboutAvatar.svelte";
  import AboutCaratteristiche from "./AboutCaratteristiche.svelte";
	import AboutPosizioni from "./AboutPosizioni.svelte";
	import ChangePassword from "./ChangePassword.svelte";
    export let data;
    export let form;
</script>

<div class="container mx-auto p-4 space-y-4">
  <ChangePassword error={form?.changePasswordError} success={form?.changePasswordSuccess}/>
  <AboutAvatar avatarPath={data?.avatar ?? "/user-solid.svg"} error={form?.avatarError} success={form?.avatarSuccess} fileSize={50}/>
  <AboutPosizioni positions={data?.positions} error={form?.positionError} success={form?.positionSuccess}/>
  <AboutCaratteristiche characteristics={data?.characteristics} error={form?.characteristicError} success={form?.characteristicSuccess}/>
</div>