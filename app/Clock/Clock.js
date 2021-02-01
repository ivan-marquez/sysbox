import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ipcRenderer } from "electron";
import "typeface-orbitron/index.css";

import "./styles.css";

function Clock(_props) {
  const [time, setTime] = useState("00:00");

  const onTimeChange = function onInit() {
    ipcRenderer.on("tick", (_event, { current }) => {
      const d = new Date(current);
      const hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
      const minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

      setTime(`${hours}:${minutes}`);
    });
  };

  useEffect(onTimeChange, []);

  return <div className="clock">{time}</div>;
}

export default Clock;
