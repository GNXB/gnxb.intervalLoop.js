/**
  * GNXB 2018 All Right Reserved
  * Author: Apiwith Potisuk (po.apiwith@gmail.com)
  * Project: intervalLoop
  * Version: 0.1.0 Alpha
*/

var intervalLoop = function() {
  var _this = this;
  var stages = [];
  _this.levels = {};

  _this.deploy = function(level, callback) {
    stages.push(level);
    _this.levels[level] = { callback };
    callback(_this.next);
  };

  _this.next = function(level, time, condition) {
    _this.levels[level].next = { condition, time };
    let lastStage = stages[stages.length - 1];

    if (level === lastStage) {
      if (condition()) {
        setTimeout(_this.levels[lastStage].callback, time, _this.next);
      } else {
        do {
          stages.pop();
          delete _this.levels[lastStage];
          lastStage = stages[stages.length - 1];
        } while(stages.length > 0 && !_this.levels[lastStage].next.condition());

        if (Object.keys(_this.levels).length) {
          let obj = _this.levels[lastStage];
          setTimeout(obj.callback, obj.next.time, _this.next);
        }
      }
    }
  };

  return _this.deploy;
};

if (module && module.exports) {
  module.exports = intervalLoop;
}
