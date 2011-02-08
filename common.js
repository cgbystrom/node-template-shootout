var sys = require('sys');
var currentLabel, startTime;

exports.times = 2000;

exports.start = function(label) {
  currentLabel = label;
  startTime = new Date;
  sys.print('  - \x1b[33m' + currentLabel + '\x1b[0m: ');
};

exports.stop = function() {
  var stopTime = new Date, duration = stopTime - startTime;
  sys.print(duration + ' ms\n');
  return duration;
};

exports.contexts = {
  bigtable: {table: []}
  /*one: 'one',
  two: 'two',
  three: 'three',
  items: Array(200).join('test ').split(' ')*/
};

for (var i = 0; i < 1000; i++) {
  exports.contexts.bigtable.table[i] = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}
}

console.log('\nbenchmarking %d times\n', exports.times);
