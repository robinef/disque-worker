'use strict';

var Worker = require('../');

//Connecting to Disque node
var client = new Worker('test', '127.0.0.1', 7711);

//Callback when job is successfuly added
function callback() {
  console.log('Job added !');
}

//Send massive job to worker
for (var i = 0; i < 5; i++) {
  client.addJob('test_queue', Date.now() , 1, 3)
  .then(function(res){
    console.log(res);
    callback(res);
  })
  .error(function(err){
    console.log(err);
  });
}
//Close connection
client.stop();
