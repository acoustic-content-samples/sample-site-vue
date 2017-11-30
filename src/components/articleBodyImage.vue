<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div :class="className">
	<img :src="imageUrl" :alt="altText" :title="altText">
	<div class="caption">{{caption}} <span>{{credit}}</span></div>
</div>
</template>


<script>
	import {loadContent, getImageUrl, getFirstCategory} from 'wch-flux-sdk';

	export default {
		data: () => ({}),
		created () {
			loadContent(this.contentId);
		},
		computed: {
			imageSize () {
				if(this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return getFirstCategory(this.$root.$data.content[this.contentId].elements.imageSize);
					}
				}
				return '';
			},
			imageUrl () {
				if(this.$root.$data.content[this.contentId]) {
					return getImageUrl(this.$root.$data.content[this.contentId].elements.image, this.imageSize);
				}
				return '';
			},
			altText () {
				if(this.$root.$data.content[this.contentId]) {
					if (this.$root.$data.content[this.contentId].elements.image.renditions) {
						return this.$root.$data.content[this.contentId].elements.image.altText;
					}
				}
				return '';
			},
			imagePlacement () {
				if(this.$root.$data.content[this.contentId]) {
					return getFirstCategory(this.$root.$data.content[this.contentId].elements.imagePlacement);
				}
				return '';
			},
			caption () {
				if(this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.imageCaption.value;
				}
				return '';
			},
			credit () {
				if(this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.imageCredit.value;
				}
				return '';
			},
			className () {
				let css = [];

				if (this.imagePlacement) {
					css.push(`wrap-text-${this.imagePlacement}`);
				}
				if (this.imageSize) {
					css.push(`article-${this.imageSize.toLowerCase()}-image`);
				}

				return css;
			}
		},
		props: ['contentId']
	}
</script>


<style lang="scss" src="styles/components/articleBodyImage.scss" scoped></style>
