const si = require("systeminformation");
const NetworkSpeed = require("network-speed");
const perfmon = require("perfmon");

// #region Clock
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutes + " " + ampm;

  return strTime;
}

function formatTime(date) {
  const hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  const minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

  return `${hours}:${minutes}`;
}

const time = si.time();
const d = new Date(time.current);
console.log(formatTime(d));
console.log(formatAMPM(d));

// #endregion

// #region Docker info
si.dockerAll((data) => console.log(data)); // Docker
si.currentLoad((data) => console.log(data)); // CPU
si.mem(data => console.log(data)); // RAM
// #endregion

// #region Internet speed
const testNetworkSpeed = new NetworkSpeed();

async function getNetworkDownloadSpeed() {
  const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(
    baseUrl,
    fileSizeInBytes
  );
  console.log(speed);
}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: "www.google.com",
    port: 80,
    path: "/catchers/544b09b4599c1d0200000289",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fileSizeInBytes = 2000000;
  const speed = await testNetworkSpeed.checkUploadSpeed(
    options,
    fileSizeInBytes
  );
  console.log(speed);
}

getNetworkDownloadSpeed();
getNetworkUploadSpeed();
// #endregion

// #region Performance counters
const counters = [
  "\\processor(_total)\\% processor time",
  "\\memory\\Available MBytes",
  "\\memory\\Committed Bytes",
  "memory\\% Committed Bytes In Use",
];

// perfmon.list("memory", function (err, data) {
//   console.log(data);
// });

// perfmon(counters, function (_err, data) {
//   console.log(data);
// });
// #endregion
