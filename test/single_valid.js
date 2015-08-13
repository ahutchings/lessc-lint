var test = require('tap').test;
var spawn = require('child_process').spawn;
var concat = require('concat-stream');

test('glob', function (t) {
  t.plan(3);

  var ps = spawn('bin/lessc-lint.js', [
    'test/single_valid/valid.less'
  ]);

  ps.stdout.pipe(concat(function (stdout) {
    t.equal(stdout.length, 0);
  }));

  ps.stderr.pipe(concat(function (stderr) {
    t.equal(stderr.length, 0);
  }));

  ps.on('exit', function (code) {
    t.equal(code, 0);
  });
});
