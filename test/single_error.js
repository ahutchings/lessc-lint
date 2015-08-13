var test = require('tap').test;
var spawn = require('child_process').spawn;
var concat = require('concat-stream');

test('glob', function (t) {
  t.plan(3);

  var ps = spawn('bin/lessc-lint.js', [
    'test/single_error/error.less'
  ]);

  ps.stdout.pipe(concat(function (stdout) {
    var expectedStdout = "test/single_error/error.less: line 2, col 27, Error - Expected ')'" +
      '\n' +
      '\n' +
      '1 problem' +
      '\n';

    t.equal(stdout.toString(), expectedStdout);
  }));

  ps.stderr.pipe(concat(function (stderr) {
    t.equal(stderr.length, 0);
  }));

  ps.on('exit', function (code) {
    t.equal(code, 1);
  });
});
