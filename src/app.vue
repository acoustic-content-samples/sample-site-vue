<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<site-header/>
	<div class="content-placeholder">
		<router-view/>
	</div>
	<site-footer/>
</div>
</template>


<script>
	import SiteHeader from './components/siteHeader/siteHeader';
	import SiteFooter from './components/siteFooter/siteFooter';

	export default {
		components: {
			'site-header': SiteHeader,
			'site-footer': SiteFooter
		}
	}
</script>


<style lang="scss" src="styles/app"></style>