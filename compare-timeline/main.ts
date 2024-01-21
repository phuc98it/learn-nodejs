import { performance, PerformanceObserver } from "perf_hooks";
import { fork } from "child_process";
import { Worker } from "worker_threads";

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

measureChildProcess().then(measureWorkerThread);

function measureChildProcess() {
  return new Promise<void>((resolve) => {
    performance.mark("child process start");
    const child = fork("./child.ts");
    child.send(20);
    child.on("message", (message: number) => {
      console.log("Result from child process: ", message);
      performance.mark("child process stop");
      performance.measure(
        "child process",
        "child process start",
        "child process stop"
      );
      resolve();
    });
  });
}

function measureWorkerThread() {
  performance.mark("worker thread start");
  const worker = new Worker("./worker.js", {
    workerData: {
      value: 20,
      path: "./worker.ts",
    },
  });
  worker.on("message", (message: number) => {
    console.log("Result from worker thread: ", message);
    performance.mark("worker thread stop");
    performance.measure(
      "worker thread",
      "worker thread start",
      "worker thread stop"
    );
  });
}
