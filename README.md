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

# EventEmitter
- method:
    + on:  nhận info sự kiện và khai báo sẵn cách xử  lí sự kiện đó.
    + emit: phát sự kiện kèm info.

eventEmitter.on("event", function (data) {      // declare handle evnet
  console.log(data); // { key: value }
  console.log(this === eventEmitter); // true
});

eventEmitter.emit("event", {                    // phat event
  key: "value",
});

eventEmitter.removeListener('event', listener); // xóa event
    
# Buffer
    - Dữ liệu dạng nhị phân.
    - Để biểu diễn những dữ liệu phức tạp như: hình ảnh, video, ...
    - Buffer is an array of numbers. Và nó là 1 mang byte -> mỗi thành phần là 1 số  có giá trị từ 0 -> 255.
    - Không thể  thay đổi kích thước khi Buffer được tạo ra.

    .alloc(size, fill)  -> tạo Buffer với khởi tạo số  lượng thành phần (size) ban đầu trong mảng.
    .from('<string>')   -> .from Buffer chứa dữ liệu truyền vào

# Stream
    - Ban đầu chưa có Stream, khi đọc file hệ thống phải chờ đợi toàn bộ dữ liệu trong tệp tải vào bộ nhớ trước khi thực hiện bất kỳ hành động nào. => dẫn đến có thể quá tải tài nguyên hệ thống trong 1 thời điểm nào đó.
    - "Every stream is an instance of EventEmitter" => chúng ta có thể  lắng nghe mọi dữ liệu đến = cách sử dụng EventEmitter API. 
    - Stream sẽ lắng nghe sự kiện 'data' event ở mọi thời điểm mà 'stream emit' phát ra kèm trong dữ liệu 'chuck'.
    - Every chucks là 1 instance của Buffer (dữ liệu kiểu mảng, chứa các giá trị nhị phân 0->255, mỗi thành phần tương ứng với 1 byte)
        => Từ dữ liệu ban đầu trong file, được chuyển hóa về dang buffer mảng -> dẫn đến việc có thể  chuyển hóa dữ liệu ban đầu thành những miếng nhỏ -> memory ko bị quá tải trong 1 thời điểm nhất định.
    - readable stream có 2 chế  độ:  paused và flowing.
        + b1: mặc định stream ở chế  độ 'paused'.
        + b2: khi lắng nghe bắt đc sự kiện 'data' event -> thì chuyển sang chế độ 'flowing' đính kèm dữ liệu đến.  

    - writeable stream : ghi từng phần dữ liệu vào file.

    - Pipes : đẩy từng phần dữ liệu khi thực hiện readableStream tới writeableStream để ghi vào file 1 cách nhanh chóng và đảm bảo, theo 1 con đường khác.
        + Khi tất cả dữ liệu được hoàn tất, readableStream sẽ phát 'end' event, và writeableStream kết thúc với writable.end function.

    ** Lưu ý : Nếu xảy ra lỗi trong quá trình xử  lí, thì nội dung có thể  không tự động 'closed', do đó cần phải theo dõi và đóng 1 cách thủ công.

    ** Chung quy có thể  có nhiều cách viết để  thực hiện đọc ghi file trong Nodejs, thực chất là dùng callback, stream, buffer.
        +) 1 số lib giúp biến thể  cách viết theo Promise hoặc async-await.




