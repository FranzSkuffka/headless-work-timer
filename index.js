const interval = require('./interval')

// A headless work timer component

// Type constructor for settings
const createSettings = workDurationInMinutes => breakDurationInMinutes => longBreakDurationInMinutes => longBreakAfter => ({
  workDuration: workDurationInMinutes * 60,
  breakDuration: breakDurationInMinutes * 60,
  longBreakDuration: longBreakDurationInMinutes * 60,
  longBreakAfter
})

const DEFAULT_STATE = {
  phase: 'work',
  second: 0, // current second
  streak: 0 // start with first work interval
}

const DEFAULT_SETTINGS = createSettings(25)(5)(15)(5)

const calculateBreakType = settings => state => {
  const hasWorkedAtAll = state.streak > 0
  const hasWorkedEnough = state.streak % settings.longBreakAfter === 0 // :)
  console.log(state.streak, settings.longBreakAfter, hasWorkedEnough)
  return hasWorkedAtAll && hasWorkedEnough ? 'longBreak' : 'break'
}

// Redux-like state update function
const update = settings => oldState => {
  const state = JSON.parse(JSON.stringify(oldState))
  const currentPhaseDuration = settings[state.phase + 'Duration']
  var phaseChanged = false

  // Just add a second
  if (state.second < currentPhaseDuration - 1) {
    state.second++
  // Or toggle between work and break
  } else {
    // Reset seconds
    state.second = 0
    // Increment streak if it was a work phase
    state.streak = state.phase === 'work' ? state.streak + 1 : state.streak
    // Determine new phase type
    state.phase = state.phase === 'work' ? calculateBreakType(settings)(state) : 'work'
    phaseChanged = true
  }

  // return the new state :)
  return [state, phaseChanged]
}

// MAIN function
const timer = (settings = DEFAULT_SETTINGS) => (state = DEFAULT_STATE) => callback => {
  var currentState = state

  // make sure that usage is correct
  if (typeof callback !== 'function') {
    console.error('callback MUST be a function')
  }

  const tick = () => {
    const stateUpdate = update(settings)(currentState)
    currentState = stateUpdate[0]
    callback(currentState, stateUpdate[1], settings)
  }

  // start the timer
  const ticker = new interval({ duration: 1000, callback: tick })
  ticker.run()

  // allow user to stop the timer
  return ticker
}

module.exports = timer
module.exports.createSettings = createSettings
