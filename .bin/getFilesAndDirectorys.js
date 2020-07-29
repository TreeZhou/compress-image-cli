const fs = require('fs');
var join = require('path').join;

/**
 * 获取目录结构和目录文件
 * @param {string}  path 目标文件夹
 * @returns {object}
 * @returns {array} object.imgPaths 文件路径列表
 * @returns {array} object.directorys 目录路径列表
 */
module.exports = function (path) {
  let imgPaths = [];
  let directorys = [];
  directorys.push(path);
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        directorys.push(fPath);
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        imgPaths.push(fPath);
      }
    });
  }
  findJsonFile(path);
  return {
    imgPaths,
    directorys
  };
};
