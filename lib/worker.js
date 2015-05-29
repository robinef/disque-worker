/*jshint strict:false */

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

  this.debugMode = true;

  /**
   * Connect to Disque on init
   */
  function connect(){

      var client = redis.createClient(disquePort, disqueIp);
      client.on("connect", function () {

      });
      client.on("error", function (err) {
        throw new Error("Connection error: "+err.message);
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
 * @param function Callback function
 */
Worker.prototype.addJob = function (queue, payload, timeout, callback) {

    this.client.send_command("ADDJOB", [queue, payload, timeout], function (err, res) {
      if(typeof callback === 'function') {
        callback(res);
      }
    });
};

/**
 * Adding job to queue
 *
 * @param string queue name
 * @param int job count
 * @param function Callback function to execute when there is a new job
 */
Worker.prototype.getJob = function (queue, count, callback) {
  var _this = this;

  _this.client.send_command("GETJOB", [ "FROM", queue], function (err, res) {
    if(typeof res[0][1] !== 'undefined'){
      //Warn Disque that we are performing job
      _this.client.send_command("FASTACK", [res[0][1]]);
      //Callback for the job
      callback(res);
      //Requeue when job is done
      _this.getJob(queue, count, callback);
    } else {
      console.log('Error : '+err);
    }
  });
};

/**
 * Get client
 * @return RedisClient
 */
Worker.prototype.getClient = function () {
  var _this = this;

  return _this.client;
};

/**
 * Stop worker
 */
Worker.prototype.stop = function () {
  var _this = this;

  _this.client.quit();
};

module.exports = Worker;