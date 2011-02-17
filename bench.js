var bm = require('./common'),
    ejs = require('./ejs/lib/ejs'),
    fs = require('fs'),
    sys = require('sys');

var str = fs.readFileSync(__dirname + '/bigtable.ejs', 'ascii');

ejs.render(str, { locals: bm.contexts.bigtable, debug: true });

var n = bm.times;
bm.start('ejs compilation');
while (n--) {
    ejs.render(str, { locals: bm.contexts.bigtable });
}
var duration = bm.stop();
sys.print('Time per template: ' + duration / bm.times + ' ms\n');


var n = bm.times;
bm.start('ejs execution');
while (n--) {
    ejs.render(str, { locals: bm.contexts.bigtable, cache: true, filename: 'example.ejs' });
}
bm.stop();
