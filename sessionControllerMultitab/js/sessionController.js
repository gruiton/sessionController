(function() {	
	/****************************
	CONSTRUCTOR
	****************************/
	SessionController = function(options) {
		var self = this;

		self.instances.push(this);
		self.idInterval = null;
		self.timer = 0;
		self.lastActivity = null;

		var defaults = {
			timeout : 20,
			gotoUrl : "login.jsp",
			alertText : "You have lost the session.",
			callback: function(){
				alert(self.settings.alertText);
			}
		}
		self.settings = $.extend( {}, defaults, options);

		self.check = function(){
			$('#timer').html(self.timer);
			self.timer++;
			if(self.timer > self.settings.timeout){
				var inactivity = getGlobalInactivity();
				if(inactivity < self.settings.timeout){
					self.timer = inactivity;
				} else{
					self.settings.callback();
					self.stop();
				}
			}
			if(self.timer % 2 == 0) {
				registerActivity();
			}
		}
	}
	
	/****************************
	PUBLIC METHODS
	****************************/
	
	//Global array to storage all instances created.
	SessionController.prototype.instances = [];

	SessionController.prototype.init = function(){
		console.log("SessionController has been launched");
		var self = this;
		
		stopInstances(self);
		self.stopped = false;
		updateLastActivity();
		self.idInterval = setInterval(self.check, 1000);

		$(window).mousemove(function (e) { 
			self.timer = 0;
			updateLastActivity();
		});
		$(window).keypress(function (e) {
			self.timer = 0;
			updateLastActivity();
		});
	}

	SessionController.prototype.stop = function(){
		clearInterval(this.idInterval);
	}

	/****************************
	PRIVATE METHODS
	****************************/
	var stopInstances = function(self){
		for(var x = 0; x < self.instances.length; x++){
			self.instances[x].stop();
			console.log('Instance: ' + self.instances[x] + ' stopped');
		}
	};
	var updateLastActivity = function(){
		var currentTime = getCurrentTime();
		self.lastActivity = currentTime;
		$('#lastActivity').text(currentTime);
	}
	var getCurrentTime = function(){
		var now = new Date();
		return ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
		("0" + now.getHours()).slice(-2)
	}
	var registerActivity = function(){
		$.ajax({
			url : "includes/register_activity.jsp",
			data : {lastActivity : self.lastActivity},
			success : function(result){
				console.log("Register Activity Result: " + $.trim(result));
			}
		});		
	}
	var getGlobalInactivity = function(){
		var currentTime = getCurrentTime();
		var diff = null;
		$.ajax({
			url : "includes/get_global_inactivity.jsp",
			data : {currentTime : currentTime},
			async : false,
			success : function(result){
				console.log("Check Last Activity Result: " + $.trim(result));
				diff = result;
			}
		});
		return diff;
	}
	//initialize and init a default SessionController
//	var SCInstance = new SessionController();		
//	SCInstance.init();
}());