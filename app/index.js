import { h, render } from "preact";

import "typeface-orbitron/index.css";
import "./app.css";

function App(_props) {
  return <div className="clock">08:30</div>;
}

render(<App />, window.document.body);
