import * as _cluster from 'cluster';
import * as http from "http";
import * as os from "os";

const cluster = _cluster as unknown as _cluster.Cluster; // typings fix
 
const numberOfCores = os.cpus().length;

console.log('numberOfCores: ', numberOfCores);


if (cluster.isMaster) {
  console.log(`Master ${process.pid} started`);
  for (let i = 0; i < numberOfCores; i++) {
    cluster.fork();
  }

  // restart Process - if process stop working
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} stopped working`);
    cluster.fork();
  });

  // process working
  cluster.on('fork', (worker) => {
    console.log(`Worker ${worker.process.pid} started`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Process ${process.pid} says hello!`);
    })
    .listen(3003);
  console.log(`Worker ${process.pid} started`);
}


/**
    === các worker riêng lẻ ===
const worker = cluster.fork();
worker.on('online', () => {
  console.log(`Worker ${worker.process.pid} started`);
});
worker.on('exit', () => {
  console.log(`worker ${worker.process.pid} stopped working`);
  cluster.fork();
});
 */
/*
  Result example: numberOfCores:  4
  Master 10594 started
  Worker 10618 started
  Worker 10619 started
  Worker 10637 started
  Worker 10639 started
*/