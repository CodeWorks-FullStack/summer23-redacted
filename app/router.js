import { AboutController } from "./controllers/AboutController.js";
import { CasesController } from "./controllers/CasesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: CasesController,
    view: /*html*/`
    <div class="container-fluid">
      <div class="row">
      <div class="col-4 bg-dark text-light" >
        <h4 ><span id="case-count"></span> Cases on file</h4>
        <section id="case-list"></section>
      </div>
      <div class="col-8" id="active-case"></div>
      </div>
    </div>
    `
  }
]