module.exports = process.env.JSCOV ? require('./lib-cov/worker') : require('./lib/worker');
