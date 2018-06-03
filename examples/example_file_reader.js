const fs = require('fs');
const TimeTriggerLoop = require('../gnxb.timeTriggerLoop');
const loop = new TimeTriggerLoop();

const files = ['file1.txt', 'file2.txt'];

var line;
var i = 0;
loop('level_file', next => {
  lines = fs.readFileSync(`./${files[i]}`, 'utf8').toString().split('\n');

  var j = 0;
  loop('level_line', next => {
    console.log(lines[j]);
    next('level_line', 1000, () => ++j < lines.length);
  });

  next('level_file', 10 * 1000, () => ++i < files.length);
});
