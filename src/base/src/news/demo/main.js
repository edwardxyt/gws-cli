import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import UAParser from "ua-parser-js";

let parser = new UAParser();
window.console.log(parser.getResult());
window.console.log(__API__, __CDN__, __ENV__, __DEBUG__, __PROJECT__);

ReactDOM.render(<App />, document.getElementById("main"));
