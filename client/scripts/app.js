// YOUR CODE HERE:
var app = {
	
	init: function(){},
	send: function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message sent');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message', data);
		  }
		});
	},
	fetch: function(){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  // url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
		  type: 'GET',
		  // data: JSON.stringify(message),
		  // contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message received');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to fetch message', data);
		  }
		});
	},
	clearMessages: function (){},
	renderMessage: function (){},
	renderRoom: function (){}

};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };