<!--
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
-->
<template>
	<component v-if="type" v-bind:is="type" :content-id="id" v-bind="props"></component>
</template>

<script>
import {getContent, loadContent} from '../';

export default {
	computed: {
		type () {
			if (this.layoutId) {
				return this.layoutId;
			} else if (this.$root.$data.content[this.id]) {
				return (this.$root.$data.content[this.id].selectedLayouts) ? this.$root.$data.content[this.id].selectedLayouts[0].layout.id.replace('-layout','') : this.$root.$data.content[this.id].type.toLowerCase().replace(' ', '-');
			}
			return '';
		}
	},
	created () {
		loadContent(this.id);
	},
	props: {
		id: {required: true},
		layoutId: String,
		props: {required: false}
	}
}
</script>
