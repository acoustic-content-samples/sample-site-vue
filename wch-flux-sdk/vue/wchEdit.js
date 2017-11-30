/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
export default {
	inserted (el, binding) {
		switch(binding.value.elementType) {
			case 'text':
				el.innerHTML = `<input type="text" value="${binding.value.value}"/>`;
				break;
			default: break;
		}
	}
};