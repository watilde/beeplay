module.exports = function (vArg) {
  if(!Array.isArray) {
    return Object.prototype.toString.call(vArg) === '[object Array]';
  }
  return Array.isArray(vArg);
};
