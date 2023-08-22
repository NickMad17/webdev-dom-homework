import { getRenderUppLocalStorage } from "./modules/localStorage.js";
import renderUpp from "./renderApp.js";
let localBool = getRenderUppLocalStorage();
renderUpp(localBool);
