<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<component v-if="type && id" v-bind:is="type" :content-id="id"></component>
</template>

<script>
import {loadContent} from '../';

export default {
	data: () => ({
		contentId: ''
	}),
	
	updated () {
		loadContent(this.$root.$data.routes[this.$route.path].contentId);
	},
	computed: {
		id () {
			if (this.$root.$data.routes[this.$route.path]) {
				return this.$root.$data.routes[this.$route.path].contentId;
			} return '';
		},
		type () {
			if (this.$root.$data.routes[this.$route.path]) {
				return this.$root.$data.routes[this.$route.path].layoutId;
			} return '';
		}
	}
}
</script>