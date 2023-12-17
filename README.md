# learn-nodejs
- module pattern
- commonJS

# Global object
- console.log(this === module.exports); // true
    + “this” keyword references to the module.exports
    + Nếu running NodeJS in console -> thì 'This' keyword sẽ references to the global object.

- Nếu khai báo biến với 'var' thì biến đó sẽ đc gán (attached) như global object.
    => Biến được khai báo bởi 'var' sẽ được truy cập tới mọi nơi.

- "Process arguments" là 1 'property' của Global Object.
    + process.argv : là array chứa 'command line' arguments, thông qua nodejs process - ngay cách nhau bởi 'dấu cách' (space)
    + first : trỏ đến đường dẫn tuyệt đối của môi trường node.
    + second: trỏ đến đường dẫn tuyệt đối của file ban đầu thực thi projcet.
    + các element còn lại là các command line arguments - giá trị được truyền vào.
        -> Get command line arguments : process.argv[2 | 3 | ...]

# Setup Typescript
- npm install -D ts-node typescript @types/node
- tsconfig.json : nơi chứa các thông tin cấu hình khi vận hành mã code project.
- ts-node transpiles our code sang thành CommonJS

# File System
- Dùng 'fs' module  : cung cấp API giúp tương tác công việc đọc/ ghi file, giúp tăng hiệu suất = cách chạy bất đồng bộ.
- Các API do 'fs' module cung cấp đều phải viết theo dạng 'callback'.
    => Áp dụng lib 'util' cho phép sử dụng bọc các API của 'fs' thành dạng Promise thông qua  util.promisify(<fs-api>)
- read file function -> return Buffer/Streams - thông qua việc mô tả file trong 'upcoming parts of the series'. (ex : {encoding: 'utf8'})


- npm start -- touch ./file.txt
- npm start -- cat ./file.txt 