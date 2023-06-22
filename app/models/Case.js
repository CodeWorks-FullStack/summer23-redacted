import { generateId } from "../utils/GenerateId.js";

const _badWords = ['california', 'mole', 'ufo', 'codeworks', 'person', 'the', 'report', 'case']

// NOTE step 1 - define your data
export class Case {
  constructor(data) {
    this.id = generateId()
    this.report = data.report || 'no report'
    this.agency = data.agency
    this.reportedDate = data.reportedDate ? new Date(data.reportedDate) : new Date()
    this.unlocked = data.unlocked ? data.unlocked : false
  }

  get ListTemplate() {
    return `<p class="selectable" onclick="app.CasesController.setActiveCase('${this.id}')">${this.agency} ${this.dateFormatted}</p>`
  }

  get ActiveTemplate() {
    return `
    <p>${this.dateFormattedLong}</p>
    <button onclick="app.CasesController.lockCase()"> 🔒lock </button>
    <textarea id="case-content" onblur="app.CasesController.lockCase()">${this.report}</textarea>`
  }

  get RedactedTemplate() {
    // return `<p>${this.computedRedactedReport}</p>`
    return `
    <p>${this.dateFormattedLong}</p>
    <button onclick="app.CasesController.unlockCase()"> 🔓unlock </button>
    <p>${this.computedRedactedReport}</p>`
  }

  get dateFormatted() {
    let date = this.reportedDate
    return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`
  }

  get dateFormattedLong() {
    return this.reportedDate.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
  }

  get computedRedactedReport() {
    // NOTE this is cool but really not going to help you out AT ALL on your checkpoint
    let arr = this.report.split(' ')

    let mapped = arr.map(word => {
      if (_badWords.includes(word.toLowerCase())) {
        return '⬛⬛⬛'
      }
      return word
    })

    return mapped.join(' ')
  }

}