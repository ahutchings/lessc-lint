var test = require('tap').test;
var spawn = require('child_process').spawn;
var concat = require('concat-stream');

test('glob', function (t) {
  t.plan(3);

  var ps = spawn(process.execPath, [
    'bin/lessc-lint',
    'test/glob/**/*.less'
  ]);

  ps.stdout.pipe(concat(function (stdout) {
    var expectedStdout = "test/glob/error1.less: line 2, col 27, Error - Expected ')'" +
      '\n' +
      'test/glob/subdir/error2.less: line 1, col 0, Error - Unrecognised input' +
      '\n' +
      '\n' +
      '2 problems' +
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
