'use strict';

var listsNamesCounter=0;

function requireFromString(src, filename)
{
  var Module = module.constructor;
  var m = new Module();
  m._compile(src, filename);
  return m.exports;
}

function getListInstance()
{
	var fs = require('fs');
	var tmp = fs.readFileSync('_template.js', "utf8");
	tmp = tmp.replace(new RegExp('␞', 'g'), listsNamesCounter);
	
	var ret = requireFromString(tmp,'_template'+listsNamesCounter+'.js');
	
	listsNamesCounter++;
	ret.init();
	return ret;
}
module.exports.getListInstance = getListInstance;
