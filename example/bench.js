'use strict';

var Worker = require('../');

//Connecting to Disque node
var test = new Worker('test', '127.0.0.1', 7711);

//Send massive job to worker
for (var i = 0; i < 2; i++) {
    test.addJob('test_queue', Date.now() , 1, function(){console.log('Job added !')});
}
test.stop();
