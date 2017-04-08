// YOUR CODE HERE:
var app = {
  
  init: function(){
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    $("#dropdown").change(function(){
        $("#dropdown").find(':selected').val();
        app.fetch();
    });

    $("#messageInput").on('submit', function(event){
      console.log('hi')
        event.preventDefault();
        var inputText = $("input[name='messageInput']").val();
        var message = {'username': window.location.search.split('=')[1],
          'text': inputText,
          'roomName': app.renderRoom()
        };
        console.log('this works')
        app.send(message);
        // app.clearMessages();
        app.fetch();
    });  
  },
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
  fetch: function(){
    var roomName = this.renderRoom();

    var that = this;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      dataType: 'json',

      success: function (data) {       
        var results = data.results;
        
        if (roomName === 'All') {
          that.clearMessages();            
        } else if(roomName){
          that.clearMessages();
          results = _.filter(data.results,function(obj){return obj.roomname === roomName});
        }

        for(var i of results){
          that.renderMessage(i);
        }

        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  clearMessages: function (){
    $('#chats').html('');
  },
  renderMessage: function (message){
    var $chatContainer = $('#chats')
    var $chat = $('<div>').addClass('chat').appendTo($chatContainer)
    $('<div>').appendTo($chat).text(message.username).addClass('username');
    $('<div>').appendTo($chat).text(message.text).addClass('text');
    $('<div>').appendTo($chat).text(message.roomname);
  },
  renderRoom: function (){
    return $("#dropdown").val();
  }

};

setInterval(function(){return app.fetch()},5000);













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


