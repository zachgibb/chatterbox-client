// YOUR CODE HERE:

// createdAt: "2013-10-08T00:29:11.661Z"
// objectId: "lI7aaJHJXS"
// roomname: ""
// text: "test"
// username: "ken"

var app = {
  init: function(){},
  send: function(){
    // window.location.search = username
  },
  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: "GET",
      contentType: 'application/json',
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
  var start = "<div class=message>";
  var end = "</div>";
  for (var i = 0; i < array.length; i++) {
    var current = array[i];
    console.log('---------------------------------');
    var roomname = '<span class="roomname">' + current.roomname + '</span>';
    var username = '<span class="username">' + current.username + '</span>';
    var text = '<span class="text">' + current.text + '</span>';

    console.log(start + roomname + text + username + end);
  }
};