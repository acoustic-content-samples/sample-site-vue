/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import Vue from 'vue';
import VueRouter from 'vue-router';

import AppComponent from './app.vue';

import StandardPage from './pages/standardPage';
import ErrorPage from './pages/errorPage';

import {WchStore, setNavChangeFunction} from 'wch-flux-sdk';
import {WchPage, WchContent, WchEdit} from 'wch-flux-sdk/vue';

import 'script-loader!foundation-sites/dist/js/foundation.js';
import 'styles/app.scss';

Vue.use(VueRouter);

// for running on local host we want to configure the WCH lib
import { configWCH } from 'wch-flux-sdk';
// configWCH('your-domain-name.com', '0000000-0000-0000-0000-000000000000');

// load components globally
Vue.component('lead-image', () => import(/* webpackChunkName: "leadImage" */ './components/leadImage'));
Vue.component('article-body-image',  () => import(/* webpackChunkName: "articleBodyImage" */ './components/articleBodyImage'));
Vue.component('share-social',  () => import(/* webpackChunkName: "shareSocial" */ './components/shareSocial'));
Vue.component('author-profile',  () => import(/* webpackChunkName: "authorProfile" */ './components/authorProfile'));

// load page components globally
Vue.component('standard-page-layout', StandardPage);
Vue.component('standard-page', StandardPage);
Vue.component('design-page-left',  () => import(/* webpackChunkName: "designPageLeft" */ './pages/designPageLeft'));
Vue.component('design-page-right',  () => import(/* webpackChunkName: "designPageRight" */ './pages/designPageRight'));

let possibleTenant = document.location.pathname.split('/')[1];
console.warn('index.html: possible tenant is %o and base url is %o', possibleTenant, possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0 ? '/' + possibleTenant + '/' : '/');
let baseUrl = possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0 ? '/' + possibleTenant + '/' : '/';

console.log("SPA framework: Vue");

// configure the router
let router = new VueRouter({
    mode: 'history',
	base: baseUrl,
	routes: [
		{path: '/', redirect: '/home'},
		{path: '/error', name: 'error', component: ErrorPage, props: true},
		{path: '/*/*', component: WchPage},
		{path: '/*', component: WchPage }
	]
});

// set nav change function for preview
setNavChangeFunction(path => router.push({path: path}));
document.title = 'Oslo';


Vue.component('wch-content', WchContent);
Vue.directive('wch-edit', WchEdit);

// load layouts dynamically
Vue.component('carousel-dynamic-list', () => import(/* webpackChunkName: "carouselDynamicList" */'./layouts/carouselDynamicList'));
Vue.component('gallery-dynamic-list', () => import(/* webpackChunkName: "galeryDynamicList" */'./layouts/galleryDynamicList'));
Vue.component('gallery-list', () => import(/* webpackChunkName: "galleryList" */'./layouts/galleryList'));
Vue.component('view-all-button', () => import(/* webpackChunkName: "viewAllButton" */'./components/viewAllButton'));
Vue.component('hero-image', () => import(/* webpackChunkName: "heroImage" */'./layouts/heroImage'));
Vue.component('hero-video', () => import(/* webpackChunkName: "heroVideo" */'./layouts/heroVideo'));
Vue.component('feature', () => import(/* webpackChunkName: "feature" */'./layouts/feature'));
Vue.component('vertical-list', () => import(/* webpackChunkName: "verticalList" */'./layouts/verticalList'));
Vue.component('sign-up', () => import(/* webpackChunkName: "signUp" */'./layouts/signUp'));
Vue.component('event', () => import(/* webpackChunkName: "event" */'./layouts/event'));
Vue.component('design-article', () => import(/* webpackChunkName: "designArticle" */'./layouts/designArticle'));


new Vue({
	el: '#app',
	components: {
		AppComponent
	},
	render (createElement) {
		return createElement(AppComponent);
	},
	data: WchStore,
	router
});
