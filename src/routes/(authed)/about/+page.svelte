<script lang='ts'>
    import Avatar from "./aboutAvatar.svelte";
	import AboutPosizioni from "./aboutPosizioni.svelte";
    export let data;
    export let form;
</script>

<div class="container mx-auto p-4 space-y-4">
  <Avatar avatarPath={data?.avatar ?? "/user-solid.svg"} error={form?.avatarError} success={form?.avatarSuccess} fileSize={50}/>
  <AboutPosizioni positions={data?.positions} error={form?.positionError} success={form?.positionSuccess}/>
</div>