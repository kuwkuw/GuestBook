require('../position/index-nocss.js');
require('../stackedMap');
require('../../.././modal/backdrop.html.js');
require('../../.././modal/window.html.js');
require('./modal');

var MODULE_NAME = 'ui.bootstrap.module.modal';

angular.module(MODULE_NAME, ['ui.bootstrap.modal', 'uib/template/modal/backdrop.html', 'uib/template/modal/window.html']);

module.exports = MODULE_NAME;
