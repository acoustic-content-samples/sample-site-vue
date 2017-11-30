<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
<div v-bind:id="contentId" class="wch-hero-video responsive-embed widescreen">
	<video
			v-bind:id="videoElementId"
			controls
			class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9">
		<!-- Supporting WebM and MP4 is the recommended way for best browser coverage. -->
		<source v-bind:src="videoUrl" v-bind:type="mediaType">
		Your browser doesn't support HTML5 video.
	</video>

</div>
</template>


<script>

import {loadContent, getVideoUrl} from 'wch-flux-sdk';
export default {
	created () {
		loadContent(this.contentId);
	},
	data: () => ({
		player: null,
	}),
	mounted () {
		this.player = videojs(this.videoElementId);
	},
	beforeDestroy () {
		if (this.player) {
			this.player.dispose();
		}
	},
	computed: {
		mediaType () {
			if (this.$root.$data.content[this.contentId]) {
				return this.$root.$data.content[this.contentId].elements.video.asset.mediaType;
			} return 'video/mp4';
		},
		videoUrl () {
			if (this.$root.$data.content[this.contentId]) {
				return getVideoUrl(this.$root.$data.content[this.contentId].elements.video);
			} return '';
		},
		videoElementId () {
			return `hero-video-${this.contentId}`;
		}
	},
	props: ['contentId']
}
	
</script>


<style lang="scss" src="styles/layouts/heroVideo.scss" scoped></style>