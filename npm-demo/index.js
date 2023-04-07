var _ = require('underscore');
var lion = require('lion-lib-32342')

// 1. Core module
// 2. File or folders
// 3. node_modules

var result = _.contains([1,2,3], 1);
console.log(result)

result = lion.add(3,4)
console.log(result)

