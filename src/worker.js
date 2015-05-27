'use strict';

var redis = require('redis');

/**
 * Disque Worker
 *
 * @param string Name of the Worker
 * @param string Ip of Disque server
 * @param int Port of Disque server
 */
var Worker = function Worker(name, ip, port){

  if(!(this instanceof Worker)){
    return new Worker(name, ip, port);
  }

  /**
   * Init private var
   */
  var disqueIp = ip || "127.0.0.1";
  var disquePort = port || 7711;
  var _this = this;

  /**
   * Connect to Disque on init
   */
  function connect(){

      var client = redis.createClient(disquePort, disqueIp);
      client.on("connect", function () {
          console.log("Connected to Disque on "+disqueIp+":"+disquePort)
      });
      client.on("error", function (err) {
          console.log("Connection error: "+err.message);
      });
      return client;
  }
  this.client = connect();
};

/**
 * Adding job to queue
 *
 * @param string queue name
 * @param string data payload
 * @param int timeout
 */
Worker.prototype.addJob = function (queue, payload, timeout) {
  var _this = this;

  this.client.send_command("ADDJOB", [queue, payload, timeout], function (err, res) {
        console.log(err);
        console.log(res);
    });
}

/**
 * Adding job to queue
 *
 * @param string queue name
 * @param int job count
 */
Worker.prototype.getJob = function (queue, count) {
  var _this = this;

  this.client.send_command("GETJOB", [ "FROM", queue], function (err, res) {
        console.log(err);
        console.log(res);
    });
}

module.exports = Worker;
