import { Case } from "./models/Case.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  // NOTE step 2 - mock up some data
  /** @type {import('./models/Case.js').Case[]} */
  cases = [
    new Case({
      report: "There was a RV blocking the parkinglot today. Witness reports claim a 'Mole person' was driving the vehicle.",
      agency: '🍔',
    }),
    new Case({
      report: "UFO landed in boise today. Occupants were from California.",
      agency: '👾',
    }),
    new Case({
      report: "There was hot coffee in the coffee pot this morning, but who brewed it? The building was empty.",
      agency: '🧪',
    }),
  ]

  activeCase = null

  // NOTE Used to load initial data
  init() {
    this.cases = loadState('cases', [Case])
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
