var parseArgs = require('minimist');
var formatter = require('./formatters/compact');
var lint = require('./lint');

module.exports = {
  interpret: function interpret (args) {
    var argv = parseArgs(args);
    var files = argv._;
    var pending = files.length;
    var errors = [];

    function onLinted (error) {
      if (error) {
        errors.push(error);
      }

      if (--pending === 0) {
        if (errors.length > 0) {
          var output = formatter({
            fileCount: files.length,
            errors: errors
          });

          console.log(output);
          process.exit(1);
        }
      }
    }

    files.forEach(function (file) {
      lint(file, onLinted);
    });
  }
};
