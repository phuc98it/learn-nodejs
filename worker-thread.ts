import { Worker, MessageChannel } from 'worker_threads';

const { port1, port2 } = new MessageChannel();
  
const worker = new Worker('./worker.js', {
  workerData: {
    value: 5,
    path: './worker.ts'     // path - transfer .ts to .js => để  dùng function()
  }
});

worker.on('message', (result) => {
  console.log(result);
});

// port1.on('message', (result) => {
//   console.log(result);
// })

// worker.postMessage({ port: port2, value: 15 });