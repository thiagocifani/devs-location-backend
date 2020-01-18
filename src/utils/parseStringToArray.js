module.exports = function parseStringToArray(s) {
  return s.split(',').map(item => item.trim());
}