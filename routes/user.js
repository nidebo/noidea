var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('127.0.0.1', 27017, {auto_reconnect: true});
db = new Db('noidea', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'noidea' database");
    }
});

/*
 * GET users listing.
 */

exports.listMessages = function(req, res){
    console.log('Retrieving messages');
    db.collection('messages', function(err, collection) {
        collection.find().toArray(function(err, messageList) {
           var result = {};
           if(err) {
              result = {
                  msg: 'Error: ' + err,
                  status: 'BAD'
              };
              res.send(result);
              console.log('Error retrieving messages: ' + err);
           }
           else {
              result = {
                msg: messageList,
                status: 'OK'
              };
              res.send(result);
              console.log('Done retrieving messages');
           }
        });
    });
};

/*
 * POST saves a Message.
 */
exports.saveMessage = function (req, res) {
  var msg = req.body.msg;
  var author = req.body.author;
  var date = new Date();
  console.log('Adding message');
  db.collection('messages', function(err, collection) {
    collection.insert({message: msg, author: author, date: date},
        {safe:true}, function(err, data) {
            var result = {};
            if(err) {
                console.log('Error adding message');
                  result = {
                  msg: 'Error: ' + err,
                  status: 'BAD'
                };
                res.send(result);
            }
            else {
                console.log('Message successfully added');
                  result = {
                  msg: 'Message successfully added',
                  status: 'OK'
                };
                res.send(result);
            }
        });
  });
};