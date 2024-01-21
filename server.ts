import * as fs from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as multiparty from 'multiparty';
import { Stream } from 'stream';
import * as os from 'os';
 
const numberOfCores = os.cpus().length;
console.log('numberOfCores : ', numberOfCores)
// var multiparty = require('multiparty');

 
const port = 3001;


interface Post {
  title: string;
  content: string;
}
 
const posts: Post[] = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet'
  }
];

function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise(resolve => {
    const chunks: any = [];
    request.on('data', (chunk) => {
      console.log(chunk);
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString()
        )
      )
    });
  })
}
 
const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case '/posts': {
      response.setHeader('Content-Type', 'application/json');   // set content response 
      if (request.method === 'GET') {
        response.end(JSON.stringify(posts));
      } else if (request.method === 'POST') {
        getJSONDataFromRequestStream<Post>(request)
          .then(post => {
            console.log(post);
            posts.push(post);
            response.end(JSON.stringify(post));
          })
      }
      break;
    }
    case '/upload': {
      if (request.method === 'POST') {
        parseTheForm(request);
      }
      break;
    }
    default: {
      response.statusCode = 404;
      response.end();
    }
  }
});

/**  */
function parseTheForm(request: IncomingMessage) {
  const form = new multiparty.Form();
  form.parse(request);
 
  const fields = new Map();
  let photoBuffer: Buffer;
  let filename: string;
 
  form.on('part', async function(part: multiparty.Part) {
    if (!part.filename) {
      await handleFieldPart(part, fields);
      part.resume();
    }
    if (part.filename) {
      filename = part.filename;
      photoBuffer = await getDataFromStream(part);
    }
  });
 
  form.on('close', () => handleWriting(fields, photoBuffer, filename));
}

async function handleFieldPart(part: multiparty.Part, fields: Map<any, any>) {
  return getDataFromStream(part)
    .then(value => {
      fields.set(part.name, value.toString());
    })
}

function handleWriting(fields: Map<any, any>, photoBuffer: Buffer, filename: string) {
  fs.writeFile(
    `files/${fields.get('firstName')}-${fields.get('lastName')}-${filename}`,
    photoBuffer,
    () => {
      console.log(`${fields.get('firstName')} ${fields.get('lastName')} uploaded a file`);
    }
  );
}


function getDataFromStream(stream: Stream): Promise<Buffer> {
  return new Promise(resolve => {
    const chunks : any = [];
    stream.on('data', (chunk : any) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      resolve(
        Buffer.concat(chunks)
      )
    });
  })
}
 
server.listen(port, () => {         // luôn luôn lắng nghe - mỗi khi request tới.
    console.log(`Server listening on port ${port}`);
});



/**
 * server = createServer(callback)
 * callback = (request, response) => { ... }
 * createServer() { listen, ... }
 */