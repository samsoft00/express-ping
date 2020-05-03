var os = require('os'),
    path = require('path');

var appRootDir = path.dirname(require.main.filename);
var pjson = require(appRootDir + path.sep +'package.json');

var DEFAULT_PATH = '/ping';

module.exports.ping = function pingMiddlewareWrapper(path) {
  path = path || DEFAULT_PATH;
  return function pingMiddleware(req, res, next) {
    if (req.path === path) {
      res.json({
        timestamp: Date.now(),
        uptime: process.uptime(),

        application: {
          name: pjson.name,
          version: pjson.version,
          pid: process.pid,
          title: process.title,
          node_env: process.env.NODE_ENV,
          versions: process.versions,
        },
        os: {
          hostname: os.hostname(),
          uptime: os.uptime()
        }
      });
    } else {
      next();
    }
  };
};
