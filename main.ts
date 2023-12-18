import * as fs from 'fs';
import * as EventEmitter from "events";
const {add, subtract} = require('./utilities')
import touch from './utils/touch'
import cat from './utils/cat'
import { StringDecoder } from "string_decoder";

console.log(add(1,2))
console.log(subtract(9,5))

console.log(this === module.exports);  // true 

// Process arguments
process.argv.forEach(argument => console.log(argument));

// Write / Read File
const command = process.argv[2];
const path = process.argv[3];
 
if (command && path) {
  switch (command) {
    case 'touch': {
      touch(path);
      break;
    }
    case 'cat': {
      cat(path);
      break;
    }
    default: {
      console.log('Unknown command');
    }
  }
} else {
  console.log('Command missing');
}

// ==== Event Emitter ==========================

const eventEmitter = new EventEmitter();

eventEmitter.on('event', function() {
  console.log('one');
});
eventEmitter.on('event', function() {
  console.log('two');
});
eventEmitter.on('event', function() {
  console.log('three');
});

eventEmitter.emit("event");

eventEmitter.on("event", function () {
  console.log("Event occured!"); // not logged into the console
});

// Passing additional data to listeners

eventEmitter.on("event1", function (data) {
  console.log(data); // { key: value }
  console.log(this === eventEmitter); // true
});

eventEmitter.on('event2', () => {
    console.log(this === eventEmitter); // false
});

eventEmitter.emit("event1", {
  key: "value",
});

eventEmitter.emit("event2");

// Remove listeners

function listener () {
  console.log('Event occurred 2!');
}
 
eventEmitter.on('event', listener);
eventEmitter.emit('event'); // Event occurred 2!
 
eventEmitter.removeListener('event', listener);
 
eventEmitter.emit('event'); /// Nothing happened 2
 

// Tránh bị lặp vô hạn để  call các event lẫn nhau: dùng setTimeout
/**
eventEmitter.on('event1-1', () => {
  setTimeout(() => {
      console.log('First event here!');
      eventEmitter.emit('event2-1');
  })
});
 
eventEmitter.on('event2-1', () => {
  setTimeout(() => {
      console.log('Second event here!');
      eventEmitter.emit('event3-1');
  })
});
 
eventEmitter.on('event3-1', () => {
  setTimeout(() => {
      console.log('Third event here!');
      eventEmitter.emit('event1-1');
  })
});
 
eventEmitter.emit('event1-1');
 */

// ===== Buffer ===== [0, 255]
const buffer = Buffer.alloc(5);
console.log(buffer)
 
buffer[0] = 255;
console.log(buffer[0]); // 255
 
buffer[1] = 256;
console.log(buffer[1]); // 0
 
buffer[2] = 260;
console.log(buffer[2]); // 4
console.log(buffer[2] === 260%256); // true
 
buffer[3] = 516;
console.log(buffer[3]); // 4
console.log(buffer[3] === 516%256); // true
 
buffer[4] = -50;
console.log(buffer[4]); // 206


// Creates a Buffer containing 1, 2, 3
const buffer2 = Buffer.from([1, 2, 3]);
console.log(buffer2[2])

const buffer3 = Buffer.from('Hello world!'); 
console.log(buffer3.toString()); // Hello world!

const buffers4 = [
  Buffer.from('Hello2 '),
  Buffer.from([0b11110000, 0b10011111]),  //data ko hoàn chỉnh
  Buffer.from([0b10001100, 0b10001110]),  //data ko hoàn chỉnh
  Buffer.from(' world!'),
];

let result = '';
buffers4.forEach((buffer) => {
  result += buffer.toString();
});
console.log(result); // Hello ��� world!

const decoder = new StringDecoder('utf8');

let resultDecoder = '';
buffers4.forEach((buffer) => {
  resultDecoder += buffer.toString();
});
console.log(resultDecoder); // Hello <hình trái đất> world!


// ==== Stream ====
const streamRead = fs.createReadStream(
  './file-read.txt',
  {
    encoding: 'utf-8'
  }
)

setTimeout(() => {
  streamRead.on('data', (chunk) => {  // đọc data từ file
    console.log(chunk);               // từng đoạn lấy data sẽ đc lưu vào chuck
  })
}, 2000);

const streamWrite = fs.createWriteStream('./file-write.txt');

streamWrite.on('finish', () => {
  console.log("All the data is transmitted !")
})

streamWrite.write('Hello')    // ghi data vào file
streamWrite.write('Hi')

streamRead.on('data', chunk => {    // ghi từng đoạn data vào file
  streamWrite.write(chunk);
});

streamRead.pipe(streamWrite)