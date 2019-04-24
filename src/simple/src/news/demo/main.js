import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import UAParser from "ua-parser-js";

let parser = new UAParser();
window.console.log(parser.getResult());
window.console.log(window.__API__, window.__Y__, window.__CDN__, window.__ENV__, window.__DEBUG__, window.__PROJECT__);

let main = function() {
	ReactDOM.render(<App />, document.getElementById("main"));
};
window.onload = function() {
	main();
};