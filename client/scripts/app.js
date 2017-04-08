// YOUR CODE HERE:
$(document).ready(function (){
  app.init();
  $("#send").on('submit', function(event){
    event.preventDefault();
    app.handleSubmit();  
  });      

  $("#roomSelect").change(function(){
    event.preventDefault();    
    var dropDownVal = $("#roomSelect").find(':selected').val();
    console.log('dropdownVal', dropDownVal)
    if(dropDownVal === "add new room"){
      console.log('went in')
      var newRoom = (prompt('Enter new room name'))
      app.renderRoom(newRoom);
    }
    app.fetch();
  });

  $("#chats").on('click', '.username', function(event){
    event.preventDefault();
    var eventData = $(event.target).html();
    app.handleUsernameClick(eventData);  
  });   
});


var app = {
  
  init: function(){
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.fetch();
    this.friends = [];
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
    var $userName = $('<div>').appendTo($chat).html(message.username).addClass('username');
    if(app.friends.includes(message.username)){
      $userName.addClass('friend');
    }
    $('<div>').appendTo($chat).text(message.text).addClass('text');
    $('<div>').appendTo($chat).text(message.roomname);
    $('<div>').appendTo($chat).text(message.createdAt);
  },
  renderRoom: function (roomName){
    var $roomSelect = $('#roomSelect');
    var $newRoomDrop = $('<option>').text(roomName).attr({'value': roomName});
    $newRoomDrop.appendTo($roomSelect);
    $roomSelect.val(roomName);
    return $("#roomSelect").val();
  },
  handleSubmit: function (){
    var inputText = $('#send').find('#message').val();
    var userName = window.location.search.split("=").slice(-1).toString();
    
    console.log('roomname', $("#roomSelect").val())

    var message = {'username': userName,
      'text': inputText,
      'roomname': $("#roomSelect").val()
    };

    console.log(message);

    app.send(message);
    $('#send').find('#message').val('');
    // app.clearMessages();
    app.fetch();

  },
  handleUsernameClick: function (userName){
    console.log('clicked on username')
    if(!app.friends.includes(userName)){
      console.log('pushed');
      app.friends.push(userName);
    }
    console.log(userName, app.friends);
    this.fetch();
  }

};


// app.init();
// app.fetch();
// setInterval(function(){app.init(); app.fetch()},3000);


