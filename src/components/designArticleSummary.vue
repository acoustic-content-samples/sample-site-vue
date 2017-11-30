<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div class="summary-card">
	<div v-if="leadImageId" class="summary-card-image">
		<!-- This sample shows the entire supplied image, so the correct aspect should be supplied by the user. -->
		<lead-image :content-id="leadImageId"></lead-image>
	</div>
	<p>{{heading}}</p>
</div>

</template>


<script>
	import {loadContent} from 'wch-flux-sdk';

	export default {
		created () {
			loadContent(this.contentId);
		},
		computed: {
			leadImageId () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.id;
				}
				return '';
			},
			heading () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				}
				return '';
			},
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/components/designArticleSummary.scss"></style>
