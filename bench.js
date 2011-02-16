var bm = require('./common'),
    ejs = require('./ejs/lib/ejs'),
    ntpl = require('ntpl'),
    fs = require('fs'),
    sys = require('sys');


// #### ejs test
var str = fs.readFileSync(__dirname + '/bigtable.ejs', 'ascii');

var n = bm.times;
//sys.print(ejs.render(str, { locals: bm.contexts.bigtable }));
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


// #### ntpl test
var str = fs.readFileSync(__dirname + '/bigtable.ntpl', 'ascii');

var n = bm.times;
//sys.print(ejs.render(str, { locals: bm.contexts.bigtable }));

var result = ntpl.nTPL({
	template: str,
	args: ["table"]
})({table: bm.contexts.bigtable.table});
var templatefunc = ntpl.nTPL({
	template: str,
	args: ["table"]
});

//sys.puts(result);

bm.start('nTPL compilation');
while (n--) {
    templatefunc({table: bm.contexts.bigtable.table});
}
var duration = bm.stop();
sys.print('Time per template: ' + duration / bm.times + ' ms\n');
bm.stop();