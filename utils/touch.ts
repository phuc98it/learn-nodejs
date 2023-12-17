import * as fs from 'fs';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

export default function touch (path: string) {
    writeFile(path, '')
        .then(() => {
            console.log('File created successfully !')
        })
        .catch(error => console.log(error))
}

/** == base default ==
    fs.writeFile('<path_file>', null, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('File created successfully');
    }
    });
 */