import { MessageChannel } from "worker_threads";

const { port1, port2 } = new MessageChannel();

// to send one of the ports to the other thread
port1.postMessage('Hello world!');

port2.on('message', (message) => {
    console.log(message);
})  //while listening to messages on the other end.