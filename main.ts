const {add, subtract} = require('./utilities')
import touch from './utils/touch'
import cat from './utils/cat'

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