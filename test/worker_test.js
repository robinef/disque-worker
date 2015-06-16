var chai = require('chai')
var Worker = require('../');
var Mitm = require("mitm")
var mitm = Mitm()

chai.should()

describe('disque-worker', function(){

  it('should be connected', function(done){
    mitm.on("connect", function(socket, opts) {

    });
    //Connecting to Disque node
    try {
      var worker = new Worker('test', '127.0.0.1', 6479);

      var client = worker.getClient();
      client.on('connect', function(){
        worker.client.connected.should.equal(true);
        done();
      });
      console.log('NEW CLIENT');
    } catch(e){
      false.should.equal(true);
    }
  })

/*
  it('should add a job in queue', function(done){
    //Connecting to Disque node
    try {
      var worker = new Worker('test', '127.0.0.1', 6379);
    } catch(e){
      false.should.equal(true);
    }
    //Adding job
    worker.addJob('queue', Date.now() , 1, function(res){
      (typeof res).should.equal('string');
      done();
    });
  })

  it('should retrieve a job in the queue list', function(done){
    //Connecting to Disque node
    try {
      var worker = new Worker('test', '127.0.0.1', 6379);
    } catch(e){
      false.should.equal(true);
    }
    worker.addJob('queue_test', Date.now() , 1, function(res){
      worker.getJob('queue_test', 1, function(res){
        (typeof res).should.equal('object');
        done();
      });
    });

  })
*/
});
