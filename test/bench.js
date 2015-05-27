'use strict';

var Worker = require('../');

//Connecting to Disque node
var test = new Worker('test', '127.0.0.1', 7711);

//Send massive job to worker
for (var i = 0; i < 500; i++) {
    test.addJob('queue', Date.now() , 1);
}
