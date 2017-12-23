const timer = require('.')

const TEST_SETTINGS = timer.createSettings(0.05)(0.05)(0.05)(2)

timer(TEST_SETTINGS)()((state, phaseChanged, settings) => {
  console.log('')
  phaseChanged ? console.log('PHASE CHANGED') : 'noop'
  console.log('PHASE', state.phase)
  console.log('SECOND', state.second)
  console.log('streak', state.streak)
  console.log(settings)
})
