import { registerRootComponent } from 'expo';
import { getCoinPrice} from 'Utils/coindesk'

import App from "./screens"
console.reportErrorsAsExceptions = false;
registerRootComponent(App);


