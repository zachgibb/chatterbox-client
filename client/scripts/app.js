// YOUR CODE HERE:

// createdAt: "2013-10-08T00:29:11.661Z"
// objectId: "lI7aaJHJXS"
// roomname: ""
// text: "test"
// username: "ken"
var lastMessageId = '';
var currentRoom = null;
var app = {
  init: function(){},
  send: function(message){
    // window.location.search = username

    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {
        order: "-createdAt",
      },
      type: "GET",
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        console.log('success');
        makeMessage(data.results);
      },
      error: function (data) {
        console.log('failure');
      }
    });
  }
};

function loadPageVar (sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
var friendsList = {};
var makeFriend= function(username){
  friendsList[username] = true;
  $('.username').each(function(){
    if ($(this).text() === username){
      $(this).addClass('friend');
    }
  });
  // $('.username').each(function(){
  //   console.log($(this).text())
  // });
};

var makeMessage = function(array) {
  // $('.messages').empty();
  var messageAssembly = function (value) {
    var start = "<div class=message>";
    var end = "</div>";
    var roomname = _.escape(value.roomname) || "Empty Room";
    var roomnameAssembeled = '<a href="#" class="roomname">' + roomname + '</a>';
    var username = _.escape(value.username) || "Anonymous User";
    var friend = '';
    if ( friendsList[username]){
      friend = 'friend';
    }
    var usernameAssembeled = '<span class="username ' + friend +'">' + username + '</span>';
    var text = _.escape(value.text) || "Empty Message";
    var textAssembeled = '<p class="text">' + text + '</p>';

    return start + usernameAssembeled + roomnameAssembeled + textAssembeled + end;
  }
  if ( !lastMessageId ){
    for (var i = 0; i < array.length; i++) {
      var current = array[i];
      $(messageAssembly(current)).hide().appendTo('.messages').fadeIn('slow');
    }
  } else {
    var index = array.lastIndexOf();
    for (var k = 0; k < array.length; k++) {
      if (array[k].objectId === lastMessageId) {
        index = k -1;
        break;
      }
    }
    for( var l = index; l >= 0; l-- ){
      var current = array[l];
      // $(messageAssembly(current)).hide().prependTo('.messages').fadeIn('slow');
      // showRoom(currentRoom);

      var $incoming = $(messageAssembly(current)).hide().prependTo('.messages');
      if (currentRoom) {
        $incoming.children('a').filter(function () {
          return $(this).text() === currentRoom;
        }).parent().fadeIn('slow');
      } else {
        $incoming.fadeIn('slow');
      }
    }
  }
  
  lastMessageId = array[0].objectId;
};

var showRoom = function(room) {
  $('.message').toggle();
  var allSpans = $('.message').find('.roomname').filter(function () {
    return $(this).text() === room;
  }).parent();
  $(allSpans).toggle();
};
setInterval(app.fetch, 1000);

$(document).ready(function(){
  app.fetch();

  $('.submit-button').on('click', function() {
    var message = {
      'username': _.escape(loadPageVar('username')),
      'text': _.escape($('.text-field').val()),
      'roomname': _.escape($('.room-field').val())
    };
    app.send(message);
  });


  $('.messages').on('click', '.username',function(){
    makeFriend($(this).text());
  });

  $('.messages').on('click', '.roomname',function(){
    if (!currentRoom) {
      currentRoom = $(this).text();
    } else {
      currentRoom = null;
    }

    showRoom($(this).text());
  });

});
