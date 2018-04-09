beeplay
=======

Write A Song In JavaScript

## Install
npm

```sh
npm install beeplay
```

bower

```sh
bower install beeplay
```

## Usage
```js
var beeplay = require('beeplay')

beeplay()
  .play(null, 2)
  .play('D#5', 1/4).play('E5', 1/4).play('F#5', 1/2)
  .play('B5', 1/2).play('D#5', 1/4).play('E5', 1/4)
  .play('F#5', 1/4).play('B5', 1/4).play('C#6', 1/4).play('D#6', 1/4)
  .play('C#6', 1/4).play('A#5', 1/4).play('B5', 1/2)
  .play('F#5', 1/2).play('D#5', 1/4).play('E5', 1/4)
  .play('F#5', 1/2).play('B5', 1/2)
  .play('C#6', 1/4).play('A#5', 1/4).play('B5', 1/4).play('C#6', 1/4)
  .play('E6', 1/4).play('D#6', 1/4).play('E6', 1/4).play('C#6', 1/4);
```
