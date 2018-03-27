import {WchStore, subscribe} from './index';

// load the store from localhost
const localContent = JSON.parse(localStorage.getItem('WchStore.content'));
if (localContent) {
	WchStore.content = localContent;
}
const localSite = JSON.parse(localStorage.getItem('WchStore.site'));
if (localContent) {
	WchStore.site = localSite;
}
// subscribe to store so we can save changes
subscribe('content', () => localStorage.setItem('WchStore.content', JSON.stringify(WchStore.content)));
subscribe('content', () => localStorage.setItem('WchStore.site', JSON.stringify(WchStore.site)));
