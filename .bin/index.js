#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const compressImage = require('./compress-image');
//添加compress默认命令
const argv = process.argv;
if (!argv.includes['compress']) {
  argv.splice(2, 0, 'compress');
}

program
  .version(require('../package.json').version)
  .usage('[compress] 图片压缩工具');
program.option(
  "-q, --quality <float,float>",
  'Set up the compress quality of png;default is 0.6,0.8'
);
program.parse(process.argv);

function compress() {
  const folder = argv[3] || './src/assets';
  if (!fs.existsSync(folder)) {
    console.log(chalk.red('文件或文件夹不存在'));
    process.exit(1);
  }
  compressImage({ folder, quality: program.quality });
}

program.command('compress').description('压缩图片').action(compress);
program.parse(process.argv);
