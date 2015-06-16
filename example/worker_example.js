'use strict';

var Worker = require('../');

//Connecting to Disque node
var worker = new Worker('test', '127.0.0.1', 7711);

//Worker callback, will be triggered when a new job is recieved
function callback(res) {
  console.log('Hi from callback');
  console.log(res);
  worker.getJob('test_queue', 1).then(function(res){
    callback(res);
  });
}
//Waiting for a job on queue and execute callback
worker.getJob('test_queue', 1).then(function(res){
  callback(res);
});
