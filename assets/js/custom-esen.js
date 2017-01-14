
document.addEventListener("DOMContentLoaded", function() {
	
	// register
	Vue.component('delay-button', {
		template: '<div id="stokeButton" v-on:click="upgrade()" v-bind:class="{disabled : isDisabled}">click to initialize delay<div class="cooldown" data-duration="{duration}"></div></div>',
	  	data: function () {
		    return {
		    	isDisabled : false,
		    	duration : 1,
		    }
		},
		methods:{
			upgrade : function(){
				this.isDisabled = !this.isDisabled;
			}
		}
	});
	// create a root instance
	var vue = new Vue({
	  el: '#example'
	});

	console.log("Custom JS Ready");

});