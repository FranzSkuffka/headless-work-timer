# headless-pomodoro
A (pomodoro technique)[https://en.wikipedia.org/wiki/Pomodoro_Technique] timer component with zero dependencies and no view layer.

## Installation
```sh
npm install --save headless-pomodoro
```

## Usage
```js
const timer = require('headless-pomodoro')

const DEFAULT_STATE = {
  phase: 'work',
  second: 0, // current second
  streak: 0 // start with first pomodoro interval
}

const DEFAULT_SETTINGS = timer.createSettings(25)(25)(15)(5)

// When the user hits 'start'
// NOTE: You don't have to make the defaults explicit - they're defaults
const stop = timer(/* DEFAULT_SETTINGS */)(/* DEFAULT_STATE */)((state, phaseChanged, settings) => {
  console.log('')
  phaseChanged ? console.log('PHASE CHANGED') : 'noop'
  console.log('PHASE', state.phase)
  console.log('SECOND', state.second)
  console.log('streak', state.streak)
  console.log(settings)
})

// When the user hits 'stop'
stop()

```

If you want to implement a 'pause' feature, just call `stop` and when you want to continue, pass the the last `state` to `start`.
