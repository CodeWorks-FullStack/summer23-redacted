import { AppState } from "../AppState.js"
import { casesService } from "../services/CasesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { setHTML, setText } from "../utils/Writer.js"


// NOTE step 3 - draw data
function _drawCaseList() {
  const cases = AppState.cases
  let template = ''
  console.log(cases)
  // template += `<h4>${cases.length} cases on file</h4>` easy street
  cases.forEach(c => template += c.ListTemplate)
  // console.log(template);
  setHTML('case-list', template)
  setText('case-count', cases.length)
}

function _drawActiveCase() {
  const activeCase = AppState.activeCase
  // if (activeCase) {
  //   setHTML('active-case', activeCase.ActiveTemplate)
  // } else {
  //   setHTML('active-case', "please select a case")
  // }
  if (!activeCase) { // if there is no case
    setHTML('active-case', "please select a case")
    return
  }

  // NOTE if your case doesn't need to be unlocked do you need these next lines?
  if (activeCase.unlocked) {
    // if there is a case and it's unlocked
    setHTML('active-case', activeCase.ActiveTemplate)
  } else {
    // if there is a case and it's locked
    setHTML('active-case', activeCase.RedactedTemplate)
  }
}

export class CasesController {
  constructor() {
    console.log('case controller loaded')

    _drawCaseList()
    _drawActiveCase()

    AppState.on('cases', _drawCaseList)
    AppState.on('activeCase', _drawActiveCase)

    // setInterval(casesService.saveCase, 1000) would need to separate out locking and saving functionality
  }

  // NOTE step 4 and beyond - add user interactions / features
  setActiveCase(caseId) {
    console.log('setting active', caseId)
    casesService.setActiveCase(caseId)
  }

  unlockCase() {
    // doesn't need an id, cause this can only happen with the active case
    console.log('unlocking')
    casesService.unlockCase()

    // NOTE this puts the users cursor into the text-area after it's drawn then adds it to the end.
    const reportElm = document.getElementById('case-content')
    reportElm.focus()
    reportElm.setSelectionRange(reportElm.value.length, reportElm.value.length)

    // NOTE re lock after time
    setTimeout(this.lockCase, 10000)
  }

  lockCase() {
    console.log('locking')
    let newContent = document.getElementById('case-content').value
    console.log(newContent);

    casesService.saveCase(newContent)
    casesService.lockCase()
  }



  createCase() {
    event.preventDefault()
    const form = event.target
    let caseData = getFormData(form)
    console.log(caseData)
    casesService.createCase(caseData)
  }
}