const IntervalLoop = require('./gnxb.intervalLoop');
const loop = new IntervalLoop();

var i = 0;
loop('level1', next => {
  console.log(i);
  var j = 0;
  loop('level2', next => {
    console.log('x' + j);
    var k = 0;
    loop('level3', next => {
      console.log('xx' + k);
      next('level3', 1000, () => (++k < 2));
    });
    next('level2', 1000, () => (++j < 2));
  });
  next('level1', 1000, () => (++i < 2));
});
