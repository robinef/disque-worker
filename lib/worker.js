/*jshint strict:false */

var redis = require('redis');
var Promise = require("bluebird");

/**
 * Disque Worker
 *
 * @param string Name of the Worker
 * @param string Ip of Disque server
 * @param int Port of Disque server
 */
var Worker = function Worker(name, ip, port) {

  if (!(this instanceof Worker)) {
    return new Worker(name, ip, port);
  }

  /**
   * Init private var
   */
  var disqueIp = ip || "127.0.0.1";
  var disquePort = port || 7711;

  this.debugMode = true;

  /**
   * Connect to Disque on init
   */
  function connect() {
    var client = redis.createClient(disquePort, disqueIp);
    client.on("connect", function() {});
    client.on("error", function(err) {
      throw new Error("Connection error: " + err.message);
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
Worker.prototype.addJob = function(queue, payload, timeout) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.send_command("ADDJOB", [queue, payload, timeout], function(err, res) {
      if (err !== null) {
        return (reject(new Error('Error while adding job')));
      }
      return (resolve(res));
    });
  });
};

/**
 * Retrieve job from queue
 *
 * @param string queue name
 * @param int job count
 */
Worker.prototype.getJob = function(queue) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    _this.client.send_command("GETJOB", [ "FROM", queue], function(err, res) {
      if (typeof res !== 'undefined' && typeof res[0][1] !== 'undefined') {
        //Warn Disque that we are performing job
        _this.client.send_command("FASTACK", [res[0][1]]);
        return (resolve(res));
      } else {
        return (reject(new Error('Cannot get job')));
      }
    });
  });
};

/**
 * Get client
 * @return RedisClient
 */
Worker.prototype.getClient = function() {
  var _this = this;

  return _this.client;
};

/**
 * Stop worker
 */
Worker.prototype.stop = function() {
  var _this = this;

  _this.client.quit();
};

module.exports = Worker;
