import { AppState } from "../AppState.js"
import { Case } from "../models/Case.js"
import { saveState } from "../utils/Store.js"

function _saveState() {
  saveState('cases', AppState.cases)
}


class CasesService {
  setActiveCase(caseId) {

    const selectedCase = AppState.cases.find(c => c.id == caseId)
    console.log('service select', selectedCase)

    AppState.activeCase = selectedCase

    console.log('active case', AppState.activeCase)
  }
  unlockCase() {
    const theCase = AppState.activeCase
    theCase.unlocked = true
    AppState.emit('activeCase')
  }

  lockCase() {
    console.log('locking in the service')
    const theCase = AppState.activeCase
    theCase.unlocked = false
    console.log('locking', AppState.activeCase)
    AppState.emit('activeCase')
  }
  saveCase(newContent) {
    const theCase = AppState.activeCase
    theCase.report = newContent
    // debugger
    // console.log(AppState.cases, AppState.activeCase)
    _saveState()
  }
  createCase(caseData) {
    const newCase = new Case(caseData)
    console.log(newCase)

    // AppState.cases.push(newCase)
    // AppState.emit('cases')

    // AppState.cases[AppState.cases.length] = newCase // very cool but not quite right, thanks though Jared

    AppState.cases = [...AppState.cases, newCase] // using spread to add to the array and trigger the emit together
    console.log(AppState.cases)
    _saveState()
  }

}

export const casesService = new CasesService()