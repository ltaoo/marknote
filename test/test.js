var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');

console.log(result);