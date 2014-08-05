// YOUR CODE HERE:

// createdAt: "2013-10-08T00:29:11.661Z"
// objectId: "lI7aaJHJXS"
// roomname: ""
// text: "test"
// username: "ken"
var lastMessageId = '';
var app = {
  init: function(){},
  send: function(){
    // window.location.search = username
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

var makeMessage = function(array) {
  // $('.messages').empty();
  var start = "<div class=message>";
  var end = "</div>";
  if ( !lastMessageId ){
    for (var i = 0; i < array.length; i++) {
      var current = array[i];
      var roomname = '<span class="roomname">Roomname: ' + _.escape(current.roomname) + '</span>';
      var username = '<span class="username">Username: ' + _.escape(current.username) + '</span>';
      var text = '<p class="text">Text: ' + _.escape(current.text) + '</p>';

      $('.messages').append(start + username + roomname + text + end);
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
      var roomname = '<span class="roomname">Roomname: ' + _.escape(current.roomname) + '</span>';
      var username = '<span class="username">Username: ' + _.escape(current.username) + '</span>';
      var text = '<p class="text">Text: ' + _.escape(current.text) + '</p>';

      $('.messages').prepend(start + username + roomname + text + end);
    }
  }
  
  lastMessageId = array[0].objectId;
  console.log(lastMessageId);
};

setInterval(app.fetch, 1000);

$(document).ready(function(){
  app.fetch();
});






// Text: ..........................................................̣''҃҄҈҅҈҆҈҅҈҄҈҃҈҄҈҅҈҆҈҅҈҄҈҃҈҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҄҃҄҅҆҅҈҄҈҃҈҄҈҅҈҆҈҅҈҄҈҃҈҄҅҆҅҄҃҄