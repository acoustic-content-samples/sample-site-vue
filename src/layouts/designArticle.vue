<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div>
	<div v-if="summary">
		<design-article-summary :contentId="contentId"></design-article-summary>
	</div>
	<div v-if="!summary">
		<lead-image v-if="leadImageId.length > 0" :content-id="leadImageId"></lead-image>
		<h2 class="headline">{{heading}}</h2>
		<div class="article-details">
			<div class="byline-and-date">By <b class="author">{{author}}</b>, <span>{{date}}</span>
			</div>
			<share-social v-if="heading && author" :tweet-msg="heading" :hash-tags="author"></share-social>
		</div>
		<div class="article-body" v-for="(item, index) in body">
			<div v-html="item"></div>
			<article-body-image v-if="index < bodyImages.length" :content-id="bodyImages[index].id"></article-body-image>
		</div>
		<div class="article-medium-image" v-for="image in getLeftoverImages()">
			<article-body-image :content-id="image.id"></article-body-image>
		</div>

		<author-profile v-if="authorBioId" :content-id="authorBioId"></author-profile>
	</div>
</div>
</template>


<script>
	import {loadContent} from 'wch-flux-sdk';
	import AuthorProfile from '../components/authorProfile';
	import DesignArticleSummary from '../components/designArticleSummary';

	export default {
		data: () => ({}),
		created () {
			loadContent(this.contentId);
			window.scrollTo(0, 0);
		},
		components: {
		    'author-profile': AuthorProfile,
			'design-article-summary': DesignArticleSummary
		},
		computed: {
			heading () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.heading.value;
				} return '';
			},
			leadImageId () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.mainImage.value.id;
				} return '';
			},
			author () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.author.value;
				} return '';
			},
			authorBioId () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.authorBio.value.id;
				} return '';
			},
			date () {
				if (this.$root.$data.content[this.contentId]) {
					return (new Date(this.$root.$data.content[this.contentId].elements.date.value)).toDateString();
				} return '';
			},
			body () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.body.values;
				} return [];
			},
			bodyImages () {
				if (this.$root.$data.content[this.contentId]) {
					return this.$root.$data.content[this.contentId].elements.bodyImage.values;
				} return [];
			},
		},
		methods: {
			getLeftoverImages () {
				return this.bodyImages.slice(this.body.length);
			}
		},
		props: ['contentId', 'summary']
	}
</script>


<style lang="scss" src="styles/layouts/designArticle.scss" scoped></style>
