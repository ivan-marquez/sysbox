import { h, render } from "preact";

import "./app.css";
import Clock from "./Clock/Clock";

function App(_props) {
  return <Clock />;
}

render(<App />, window.document.body);
