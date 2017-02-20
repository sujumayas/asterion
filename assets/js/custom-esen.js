
document.addEventListener("DOMContentLoaded", function() {
	
	// register
	Vue.component('timed-action', {
		template: '<div id="stokeButton" v-on:click="vUpgrade(adds, removes)" v-bind:class="{disabled : isDisabled}">{{name}}<div class="cooldown" :data-duration="duration"></div></div>',
	  	props: [
	  		'duration',
	  		'name',
	  		'adds',
	  		'removes',
	  	],
	  	data: function () {
		    return {
		    	isDisabled : false,
		    	duration : this.duration,
		    	name: this.name, 
		    	adds: this.adds,
		    	removes: this.removes,
		    }
		},
		methods:{
			vUpgrade : function(adds, removes){
				//Just a simple caller so we can create independency of methods later.  
				silene.vUpdate(adds,removes);
			}
		}
	});

	Vue.component('warning-message',{
		template: '<div class="modal-background" id="validationNoticeModal" :v-show="activeWarning">'+
					'<div class="modal-container">'+
						'<h2 class="modal-title" id="modalMessage">'+
							'{{message}}'+
						'</h2>'+
						'<button @click="$emit(\'close\')">Close</button>'+
					'</div>'+
				'</div>',
		props: [
			'message',
			'activeWarning',
		],
		data:function(){
			return {
				message: this.message,
				activeWarning : this.activeWarning,
			}
		},
	});
	// create a root instance
	var silene = new Vue({
	  el: '#Silene', 
	  data: {
	  	message: "no important messages for now",
	  	activeWarning : false,
	  	money: 100,
	  	minmoney: 9,
	  	gas: 0,
	  	mingas: 199,
	  	solar: 10000,
	  	minsolar: 19,
	  	actions : [
	  		{	
	  			name: "Buy Gas", 
	  			duration:20, 
	  			adds:[{qty:50,item:"gas"}],
	  			removes:[{qty:10,item:"money"}], 
	  			stoppable:"no"
	  		},
	  		{	
	  			name: "Move (Short)", 
	  			duration:10, 
	  			adds:[],
	  			removes:[{qty:20,item:"solar"}], 
	  			stoppable:"yes"
	  		},
	  		{	
	  			name: "Move (Warp)", 
	  			duration:10, 
	  			adds:[],
	  			removes:[{qty:200,item:"gas"},{qty:200,item:"solar"}], //Esto no funca aún, porque no hay validación.
	  			stoppable:"no"
	  		},
	  		{	
	  			name: "Cheat", 
	  			duration:2, 
	  			adds:[{qty:100,item:"money"}],
	  			removes:[], 
	  			stoppable:"no"
	  		},
	  	],
	  },
	  methods: {
	  	vUpdate: function(adds, removes){
	  		//First check if theres something to remove
	  		let disableGain = false;
	  		//If this is an action that spends some resource
	  		if(removes.length > 0){
	  			//Check how many resources are we going to spend
	  			for (var j = 0; j < removes.length; j++) {
	  				//check if the ship has enough of it so we can spent it
		  			if(!disableGain && (this[removes[j].item] > this["min"+removes[j].item])){
		  				// Spend the resource
		  				this[removes[j].item] = this[removes[j].item] - removes[j].qty;	
		  				
		  			}else{
		  				//If the ship has not enough resources, disable the Action
		  				disableGain = true;
		  				//show modal with correct message
		  				silene.vModal("No more " + removes[j].item);
		  			}
		  		}	
	  		}
	  		//check if the action is disabled
	  		if(!disableGain && adds.length > 0){
	  			// If its not disabled, check how many resources are we going to gain
	  			for (var i = 0; i < adds.length; i++) {
	  				// Gain resources
		  			this[adds[i].item] = this[adds[i].item] + adds[i].qty;
		  		}	
	  		}
	  	},
	  	vModal:function(message){
	  		// console.log(silene);
	  		this.message = message;
	  		this.activeWarning = true;
	  	},
	  }
	});

	console.log("Custom JS Ready");

});