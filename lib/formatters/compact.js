module.exports = function (result) {
  var output = '';
  var total = result.errors.length;

  result.errors.forEach(function (error) {
    output += error.filename + ': ' +
      'line ' + error.line + ', ' +
      'col ' + error.column + ', ' +
      'Error - ' + error.message +
      '\n';
  });

  if (total > 0) {
    output += '\n' + total + ' problem' + (total !== 1 ? 's' : '');
  }

  return output;
};
