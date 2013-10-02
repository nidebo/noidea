$(document).ready(function(){

    var host = 'http://' + window.location.hostname;
    var port = ':' + window.location.port;

    var listMessages = function(messageList) {
        for (var i = 0; i < messageList.length; i++) {
            var element = $('<div class="message-element"></div>');
            var author = $('<p class="message-author">' + messageList[i].author + '</p>');
            var msg = $('<p class="message-text">' + messageList[i].message + '</p>');
            var dateObj = new Date(messageList[i].date);
            var date = $('<p class="message-date">Posted on ' + dateObj.getDate() + '/' +
                (dateObj.getMonth()+1) + '/' + dateObj.getFullYear() + '</p>');
            element.append(author).append(msg).append(date);
            $('#messages').append(element);
        }
    };

    var listUrl = host + port + '/messages';

    $.ajax({
                type: "GET",
                url: listUrl,
                dataType: "json",
                success:function(data) {
                    if (data.status === 'OK') {
                        //list Messages
                        listMessages(data.msg);
                    }
                    else {
                        //alert that message has NOT been successfully saved
                        var notRetrievedAlert = $('<p class="save-info-bad">Oops! error retrieving messages occurred</p>');
                        $('#messages').append(notRetrievedAlert);
                    }
                },
                error: function(jqXHR, status, error) {
                    //alert that message has NOT been successfully saved
                    var notRetrievedAlert = $('<p class="save-info-bad">Oops! error saving message occurred</p>');
                    $('#messages').append(notRetrievedAlert);
                    console.log('REST Error: ' + JSON.stringify(error));
                }
            });

    $("#submitButton").click(function() {
        var author = $("#author").val();
        var message = $("#message").val();
        //check empty input
        if(author === '' || message === '')
            alert('Write in all fields!');
        else {
            var data = {
                author: author,
                msg: message
            };
            var url = host + port + '/message';
            console.log("POST: " + url);
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                success:function(data) {
                    if (data.status === 'OK') {
                        //alert that message has been successfully saved
                        var savedAlert = $('<p class="save-info-ok">Message succesfully saved!</p>');
                        $('#save').append(savedAlert);
                        console.log('Success!');
                    }
                    else {
                        //alert that message has NOT been successfully saved
                        var notSavedAlert = $('<p class="save-info-bad">Oops! error saving message occurred</p>');
                        $('#save').append(notSavedAlert);
                    }
                },
                error: function(jqXHR, status, error) {
                    //alert that message has NOT been successfully saved
                    var notSavedAlert = $('<p class="save-info-bad">Oops! error saving message occurred</p>');
                    $('#save').append(notSavedAlert);
                    console.log('REST Error: ' + JSON.stringify(error));
                }
            });
        }
    });
});