import { IncomingHttpHeaders, RequestOptions, request } from 'http';

// import { createWriteStream } from 'fs';
// const fileStreamReponseHttp = createWriteStream('./file-reponse-http.txt');

interface Response {
    data: object,
    headers: IncomingHttpHeaders
}


export default function performRequest(options: RequestOptions) {
    return new Promise((resolve, reject) => {
        request(
            options,
            (response) => {
                const { statusCode, headers } = response;
                if (statusCode >= 300) {
                    reject(
                        new Error(response.statusMessage)
                    )
                }
                const chunks : any = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                })
        
                response.on('end', () => {
                    const data = Buffer.concat(chunks).toString();    // save reponse to variable
                    const result: Response = {
                        data: JSON.parse(data),
                        headers
                    }
                    resolve(result);
                })
                
                // response.pipe(fileStreamReponseHttp)    // write data to file
            }
        )
        .end();
    })
}       

/**
 * new Promise(callback)
 * callback(resolve, reject) {...}
 */