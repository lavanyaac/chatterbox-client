// YOUR CODE HERE:
$(document).ready(function (){
  app.init();
  $("#send").on('submit', function(event){
    event.preventDefault();
    app.handleSubmit();  
  });      

  $("#roomSelect").change(function(){
    $("#roomSelect").find(':selected').val();
    app.fetch();
  });

  $("#chats").on('click', function(event){
    event.preventDefault();
    console.log('went in here');
    app.handleUsernameClick();  
  });      
});


var app = {
  
  init: function(){
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.fetch();
  },
  send: function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('message',message);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(){
    var roomName = $("#roomSelect").val();

    var that = this;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',

      data: {limit: 1000, order: '-createdAt'},
      contentType: 'application/json',
      // dataType: 'json',

      success: function (data) {       
        var results = data.results;
        console.log(data);
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
    $('<div>').appendTo($chat).text(message.createdAt);
  },
  renderRoom: function (roomName){
    var $roomSelect = $('#roomSelect');
    var $newRoomDrop = $('<option>').val(roomName);
    $newRoomDrop.appendTo($roomSelect);
    return $("#roomSelect").val();
  },
  handleSubmit: function (){
    var inputText = $('#send').find('#message').val();
    console.log('inputText', inputText);
    var userName = window.location.search.split("=").slice(-1).toString();
    var message = {'username': userName,
      'text': inputText,
      'roomName': 'Lobby'
    };
    console.log(message);
    app.send(message);
    app.clearMessages();
    app.fetch();
  },
  handleUsernameClick: function (){
    console.log('clicked on username')
  }

};


// app.init();
// app.fetch();
// setInterval(function(){app.init(); app.fetch()},3000);













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


