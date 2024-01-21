
import { parentPort, workerData } from 'worker_threads';
// import Data from './Data';

function factorial(n: number): number {
  if(n === 1 || n === 0){
    return 1;
  }
  return factorial(n - 1) * n;
}
 
parentPort.postMessage(             // .postMessage(...) gửi trả về  'main thread'.
  factorial(workerData.value)
);

// parentPort.on('message', (data: Data) => {
//   const { port } = data;
//   port.postMessage(factorial(data.value));
// });