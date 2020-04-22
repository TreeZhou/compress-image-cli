const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const chalk = require('chalk');
const getFilesAndDirectorys = require('./getFilesAndDirectorys');

//? path配置参考[https://github.com/sindresorhus/globby#globbing-patterns]
module.exports = function compress({ folder, quality = '0.6,0.8' }) {
  quality = [Number(quality.split(',')[0]), Number(quality.split(',')[1])];
  console.log(quality);
  let { directorys } = getFilesAndDirectorys(folder);
  const readonlyArray = directorys.length > 0 ? directorys : [folder];
  readonlyArray.forEach(element => {
    imagemin([element + '/*.{jpg,png}'], {
      destination: element,
      plugins: [
        mozjpeg(),
        imageminPngquant({
          quality
        })
      ]
    })
      .then(files => {
        files.forEach(e => console.log(e.destinationPath));
        console.log(chalk.greenBright(`压缩成功，共有图片${files.length}张`));
      })
      .catch(err => console.log('err', err));
  });
};
