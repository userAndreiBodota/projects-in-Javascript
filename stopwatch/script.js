let runningInterval = null,
  startTime = 0,
  elapsedTime = 0;
const element = document.getElementById("stopwatch");

const startStopWatch = () => {
  if (!runningInterval) {
    startTime = Date.now() - elapsedTime;
    runningInterval = setInterval(() => {
      displayTime((elapsedTime = Date.now() - startTime));
    });
  }
};

const stopStopWatch = () => {
  clearInterval(runningInterval), (runningInterval = null);
};

const resetStopWatch = () => {
  stopStopWatch(), displayTime((elapsedTime = 0));
};

const displayTime = (time) => {
  const pad = (n) => (n < 10 ? "0" : "") + n;

  element.innerText = `${pad(Math.floor(time / 6000))}:${pad(
    Math.floor(time / 1000) % 60
  )} ${pad(Math.floor(time % 1000) / 10)}`;
};
