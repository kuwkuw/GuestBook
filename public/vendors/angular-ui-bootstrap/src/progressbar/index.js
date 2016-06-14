require('../../.././progressbar/progressbar.html.js');
require('../../.././progressbar/progress.html.js');
require('../../.././progressbar/bar.html.js');
require('./progressbar');

var MODULE_NAME = 'ui.bootstrap.module.progressbar';

angular.module(MODULE_NAME, ['ui.bootstrap.progressbar', 'uib/template/progressbar/progressbar.html', 'uib/template/progressbar/progress.html', 'uib/template/progressbar/bar.html']);

module.exports = MODULE_NAME;
