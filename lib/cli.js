var glob = require('glob');
var formatter = require('./formatters/compact');
var lint = require('./lint');

module.exports = {
  interpret: function interpret (args) {
    glob(args[0], function (error, files) {
      if (error) throw error;

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
    });
  }
}
