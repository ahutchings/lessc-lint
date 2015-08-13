var fs = require('fs');
var less = require('less');

module.exports = function lint (file, callback) {
  fs.readFile(file, {encoding: 'utf8'}, function (error, data) {
    if (error) throw error;

    var options = {
      filename: file
    };

    less.render(data, options, function (error, output) {
      if (error) return callback(error);
      callback();
    })
  });
}
