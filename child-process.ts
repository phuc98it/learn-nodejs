import { spawn, exec, execFile, fork } from 'child_process';
import { createReadStream, readFile } from 'fs';
/*
const child = spawn('ls');  // listen all contents of directory. 

const readableStream = createReadStream('./file.txt');
const wc = spawn('wc', ['-c']);   // write command

const start = Date.now();
console.time('reading file');
readFile('./file.txt', () => {
    console.timeEnd('reading file');
    const end = Date.now()
    console.log("time: " , end-start)
    // process.exit();
});

// let i = 0;
// setInterval(() => {
//   console.log(i++);
// }, 10);

child.stdout.on('data', (data) => {
    console.log(data.toString())
})

const start2 = Date.now();
// write to wc
readableStream.pipe(wc.stdin);

// read from wc
wc.stdout.on('data', (data) => {
  console.log(`Number of character: ${data}`);
  const end2 = Date.now()
  console.log("time2: " , end2-start2)
})
*/

//ls và grep : múc đích ở đây là tìm ra các file có kiểu .txt

// spawn('ls | grep .txt'); // throws an error
/*
execFile('ls', (error, result) => {
  console.log("--- execFile ---", result);
});
 
exec('ls | grep .txt', (error, response) => {
  console.log("--- exec ---", response);
});


// If you want to use the shell, but still work with streams, you can pass  shell: true to the spawn function.
const child2 = spawn('ls | grep .txt', {
  shell: true
});

child2.stdout.on('data', (result) => {
  console.log('--- Spawn Shell ---', result.toString());
})
*/
const forkChild = fork('./child.ts');
console.log(process.execArgv);


forkChild.send(5);   // send() - thuộc 'message' event.

// function receive data through 'message' event.
forkChild.on('message', (massage: number) => {
  console.log('Result: ', massage)
})

/**
import { fork } from 'child_process';
 
function factorial(n: number) {
  return new Promise((resolve, reject) => {
    const child = fork('./child.ts');
    child.send(n);
    child.on('message', (result: number) => {
      resolve(result)
    });
    child.on('error', () => {
      reject()
    });
  })
}

factorial(20)
  .then((result) => {
    console.log('Result: ', result);
  })
  .catch(() => {
    console.log('An error occured');
  });
 */