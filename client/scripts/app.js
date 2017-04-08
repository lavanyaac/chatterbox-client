// YOUR CODE HERE:
var app = {
	
	init: function(){},
	send: function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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
	fetch: function(roomName){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
		  type: 'GET',
		  dataType: 'json',
		  // dataFilter: function (data){
		  // 	// var returnVal = data;
		  // 	console.log(JSON.parse(data));
		  // 	return JSON.parse(data);},
		  success: function (data) {
        console.log(data);
        //if roomname is defined
          //do the filter thing and assign to results
        var results = data.results;
        if(roomName){
          results = _.filter(data.results,function(obj){return obj.roomname === roomName});
        }
		  	for(var i of results){
		  		var $chatContainer = $('#chats')
		  		var $chat = $('<div>').addClass('chat').appendTo($chatContainer)
		  		$('<div>').appendTo($chat).text(i.username).addClass('username');
				  $('<div>').appendTo($chat).text(i.text).addClass('text');
          $('<div>').appendTo($chat).text(i.roomname);
		  	}

        //if roomnamte is defined




		  	// $('#chats').text(JSON.stringify(data));
		    console.log('chatterbox: Message received');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to fetch message', data);
		  }
		});
	},
	clearMessages: function (){
		var $chatContainer = $('#chats');
    $chatContainer.html('');
	},
	renderMessage: function (message){},
	renderRoom: function (){}

};

// setInterval(app.fetch,5000);

function dropDownClick(){
  var val = $('#dropdown').val();
  console.log(val);
}














// var message = {
//   username: 'alan and lavanya',
//   text: 'trololo FROM 3:30PM',
//   roomname: '4chan'
// };

// var testArr = [{
//     username: 'alan and lavanya',
//     text: 'trololo FROM 3:30PM',
//     roomname: 'room1'
//   },{
//     username: 'alan and lavanya',
//     text: 'trololo FROM 3:30PM',
//     roomname: 'room2'
//   },{
//     username: 'alan and lavanya',
//     text: 'trololo FROM 3:30PM',
//     roomname: 'room3'
//   },{
//     username: 'alan and lavanya',
//     text: 'trololo FROM 3:30PM',
//     roomname: 'room4'
//   },{
//     username: 'alan and lavanya',
//     text: 'trololo FROM 3:30PM',
//     roomname: 'room5'
//   }];

// _.filter(testArr,function(obj){return obj.roomname === 'room1'});


