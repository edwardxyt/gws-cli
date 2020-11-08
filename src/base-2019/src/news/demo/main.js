import React from "react";
import ReactDOM from "react-dom";
import UAParser from "ua-parser-js";

import PC from "./pcRouter";
import Mobile from "./mobileRouter";

let parser = new UAParser();
let device = parser.getResult().device;

let App;

if (device.type === "mobile") {
    App = Mobile;
} else {
    App = PC;
}

console.log(parser.getResult());
console.log(__API__, __CDN__, __ENV__, __DEBUG__, __PROJECT__);

ReactDOM.render(<App />, document.getElementById("main"));
