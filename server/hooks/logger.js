// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation

const logger = require('winston');
logger.level = 'debug';

module.exports = function () {
  return context => {
    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`);
    
    if(typeof context.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(context, null, '  '));
    }
    
    if (context.error) {
      logger.error(context.error);
    }
  };
};
