console.log('Hello world!');

// Tính toán "giai thừa" !
function factorial(n: number) : number {
    if (n === 1 || n === 0) {
        return 1;
    }
    return factorial(n - 1) * n;
}

// function receive data through 'message' event.
process.on('message', (n: number) => {
    process.send(factorial(n));
    process.disconnect();
})