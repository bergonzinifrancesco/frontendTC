<script lang="ts">
	import AboutAdvancedInfo from './AboutAdvancedInfo.svelte';
	import AboutAvatar from './AboutAvatar.svelte';
	import AboutBasicInfo from './AboutBasicInfo.svelte';
	import AboutCaratteristiche from './AboutCaratteristiche.svelte';
	import AboutPosizioni from './AboutPosizioni.svelte';
	import ChangePassword from './ChangePassword.svelte';
	export let data;
	export let form;
</script>

<div class="container mx-auto p-4 space-y-4">
	<ChangePassword error={form?.changePasswordError} success={form?.changePasswordSuccess} />
	<AboutBasicInfo
		{...data.basicInfo}
		error={form?.changeBasicInfoError}
		success={form?.changeBasicInfoSuccess}
	/>
	<AboutAdvancedInfo
		{...data.advancedInfo}
		error={form?.changeAdvancedInfoError}
		success={form?.changeAdvancedInfoSuccess}
	/>
	<AboutAvatar
		avatarPath={data?.avatar ?? '/user-solid.svg'}
		error={form?.avatarError}
		success={form?.avatarSuccess}
		fileSize={50}
	/>
	<AboutPosizioni
		positions={data?.positions}
		error={form?.positionError}
		success={form?.positionSuccess}
	/>
	<AboutCaratteristiche
		characteristics={data?.characteristics}
		error={form?.characteristicError}
		success={form?.characteristicSuccess}
	/>
</div>
