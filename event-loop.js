// console.time('setTimeout');
// setTimeout(() => {
//   console.log('Timer went off');
//   console.timeEnd('setTimeout');
// }, 100);  // này chạy sau
 
// setTimeout(() => {
//   for(let i = 0; i < 10000000; ++i);
//   console.log("90")
// }, 90); // này chạy trước


// let i = 0;
 
// const id = setInterval(() => {
//   console.log(i++);
//   if(i > 10) clearInterval(id);
// }, 10);

// setTimeout(() => {
//   console.log('set timeout');
// }, 0);
// setImmediate(() => {
//   console.log('set immediate');
// });

let fs = require('fs');
 
fs.readFile('./file-write.txt', () => {
  setTimeout(() => {
    console.log('set timeout');
  }, 0);
  setImmediate(() => {
    console.log('set immediate');
  });
});
