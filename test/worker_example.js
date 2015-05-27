'use strict';

var Worker = require('../');

//Connecting to Disque node
var test = new Worker('test', '127.0.0.1', 7711);

//Waiting for a job on queue and execute callback
test.getJob('queue', 1, function(res){
  console.log('Hi from callback');
  console.log(res);
});
