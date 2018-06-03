# Interval Loop with Nest-able
Interval loop with support Nest-able and Clean Code. Designed for making interval loop more simple.

Supports Node.js and Web Browser JavaScript.

## Usages
- Use in the project like streaming data to client
- Read log, compile and forward

### Node.js
```JavaScript
const IntervalLoop = require('/PATH/TO/gnxb.intervalLoop');
const loop = new IntervalLoop();
```

### Web Browser JavaScript
```HTML
<script src="/PATH/TO/gnxb.intervalLoop.js"></script>
<script>
const loop = new intervalLoop();
</script>
```

### Syntax
```JavaScript
// Use Loop Name as Key Level of looping
loop('Loop Name', next => {
  // Statements...

  // Condition at end of loop (look like do-while)
  // <microtime> e.g. 1000 = 1 seconds
  // <condition> that return boolean for determining, if "true" loop will continue, if "false" loop in this level will end and go back to lower level loops (if exist).
  next('Loop Name', microtime, () => condition);
});
```

Noted that "condition" must be function with return boolean because of outstanding of variable scope of JavaScript.

### Example
See "demo.js" or see an example case below (Node.js). Look full example in ./examples folder
```JavaScript
const fs = require('fs');
const IntervalLoop = require('/PATH/TO/gnxb.intervalLoop');
const loop = new IntervalLoop();

const files = ['file1.txt', 'file2.txt'];

var line;
var i = 0;
loop.deploy('level_file', next => {
  lines = fs.readFileSync(`./${files[i]}`, 'utf8').toString().split('\n');

  var j = 0;
  loop.deploy('level_line', next => {
    console.log(lines[j]);
    next('level_line', 1000, () => ++j < lines.length);
  });

  next('level_file', 10 * 1000, () => ++i < files.length);
});
```

## Concepts
### 1) Focus on simple usage
Looks at intervalLoop like do-while.
```JavaScript
// sleep from npm or DIY
do {
  // Statements...
  do {
    // Statements...
    sleep(1000);
  } while (condition2);

  sleep(10 * 1000);
} while (condition1);
```

to

```JavaScript
loop.deploy('level1', next => {
  // Statements...

  loop.deploy('level2', next => {
    // Statements...
    next('level2', 1000, () => condition2);
  });

  next('level1', 10 * 1000, () => condition1);
});
```

Noted that I do not use sleep() because when it is on Express.js or any server, sleep() will freeze entire server and do not response any requesting for a while.

### 2) Ease of Understandable code
Generally of writing code loop and time delay
```JavaScript
function loop(i) {
  // Statements...

  if (i < 5) {
    setTimeout(loop, 1000, ++i);
  }
}

loop(0);
```
and adding nested loop
```JavaScript
function loop_file(i) {
  // File Statements...
  var lines = [...];

  loop_line(i, 0, lines);
}

function loop_line(i, j, lines) {
  // Line Statements
  if (j < lines.length) {
    setTimeout(loop_line, 1000, i, ++j, lines);
  } else {
    setTimeout(loop_file, 1000, i);
  }
}

loop_file(0);
```
and if it must be added another level nested loop, it too hard to imagine the code.

That it caused I wrote this project.

## Authors
Apiwith Potisuk (po.apiwith@gmail.com)

GNXB, 2018 All Rights Reserved.

MIT License
