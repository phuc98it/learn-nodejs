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
        + 1 số lib giúp biến thể  cách viết theo Promise hoặc async-await.

# Request - Response
    - http.ClientRequest : 
        + request function : là 1 instance của ClientRequest mà ClientRequest kế  thừa từ Stream.
        => request có đầy đủ tính chất của 1 Stream, kết hợp với Buffer và Pipe.
    - multipart/form-data : là trường hợp thường thấy áp dụng để  (http.ClientRequest) xử  lí chúng công việc.
        + FormData hỗ  trợ chứa dạng key-value.
        + multipart bắt nguồn từ MIME (Multipurpose Internet Mail Extensions) : là 1 chuẩn format email
    -> type of Request có thể  combine (kết hợp) 1 hoặc nhiều kiểu dữ liệu (single body | separated by boundaries).

    - headers: có thể  chứa 1 trong các kiểu sau.
        + 'Content-Type': 'application/json'
        + 'content-type': 'multipart/form-data, boundary=--------------------------<random_string>'

    => multipart/form-data  : có thể  chứa các loại data khác nhau (như ảnh, buffer, string, number) khi thực hiện request tới server.

    - http.Server : createServer function là 1 dạng EventEmitter và trả về  1 instance http.Server.
        + createServer() chứa các tính chất của EventEmitter, Stream và nó sẽ đảm nhiệm công việc 'listen' mỗi lần request tới server.
        +  


# Event-Loop
    - Xét trong môi trường NodeJS.
    - Mỗi lần event-loop được thực hiện -> là sự lặp lại của các phase được diễn ra trong hệ thống.
    - Phases: timers -> pedding callbacks -> idle, prepare -> poll (*) -> check -> close callbacks.
    + phase "timers": ý nó đến những function chờ thời gian để  thực thi. (setTimeout, setInterval)
    + phase "Pending Callbacks" | "idle & prepare": thực thi gọi lại 1 số  hoạt động của hệ thống, như TCP errors, ... (tìm hiểu sâu hơn ở 'libbuv')
    + phase "poll" : giai đoạn xử  lí từng sự kiện.
    + phase "check" : gọi setImmediate() -> xử lí sau khi giai đoạn "Poll End".
    + phase "close callbacks" : đóng run callback. (ví dụ socket kết thúc - socket.destroy()) 

*) Xét trong 1 tình huống cụ thể như I/O cycle (trong lệch gọi lại sau khi đọc tệp) => thì setImmediate() luôn được ưu tiên chạy trước so với setTimeout()


# Thread Pool & Child Process
- Mặc định trong NodeJS có 4 luồng (thread) - Thread này do NodeJS định nghĩa và quản lí.
- Có thể  cấu trúc lại luồng trong NodeJS bằng cách thay đổi giá trị biến môi trường "UV_THREADPOOL_SIZE".
- Phải tách biệt được khái Process & Thread.
    + Số  luồng trong Project - bằng việc xét số lượng cho process.UV_THREADPOOL_SIZE.
    + Số  lượng Process - phụ thuộc cấu hình - Luồng của máy tính và việc Dev khai báo số lượng instance (child process).
    + Max number Process (Core) = số lượng luồng của máy tính vật lí. 
- Các Process giao tiếp với nhau thông qua 'message event'.
    + Process cung cấp các chuẩn stream (hay Standard I/O property - giúp tương tác với file tốt hơn).
    + Process cũng cung cấp 'emits events'.

- Child Process mang đầy đủ tính chất Standard Input/Output của Stream.
    + Có thể  access theo chuẩn input/output stream như: stdin, stdout, stderr, ...
    + spawn() : có thể  thực thi bất kì hệ điều hành nào, trong 1 tiến trình riêng biệt (separate process).
    + exec() : tương tự như spawn, nhưng có 1 số  khác biệt như work với shell và xử  lí callback.
    + execFile() : hơi hướng kết hợp giữa 'spawn' và 'exec'.
        Hàm không tạo ra shell, mà hoạt động với callbacks instead of streams.
    + disconnect() : exit event - khi kết thúc tiến trình con (child process).
        Nếu tiến trình call bị error, thì hệ thống sẽ ko thể  kết thúc và send message 'unsuccessfull'
    + fork() : tạo ra process mới và kế thừa (inherits) các tính năng 'process.execArgv' property.
- ThreadPool : không phải là lập trình đa luồng.
    (khám phá Worker Thread - lập trình đa luồng).

- Cluster : quản lí các tiến trình con (multiple processes) là mục đích chính của khái niệm này.
    + Tất cả các process, đều hoạt động trên cùng 1 port (share server port).
    + Main Process có trách nghiệm nhận request, và phân phối đến các Child Process để tiến hành xử lí.

- Phân biệt 'message event' và 'emit event'.
    + message event (Sending Messages) : khái niệm của process.argv
    + emit event (Emitting Events) : khái niệm của EventEmitter
    
- PID (process ID) : tương ứng với 1 process đang được chạy trong os.
    

*) Note: giao tiếp giữa các process - Mỗi lượt như vậy child process sẽ call disconnect()
        -> để kết thúc 1 event đã xảy ra.
    +) nếu không call disconnect() sau mỗi lần main-process nhận đc data,
        -> thì tiến trình chính của chúng ta (our primary process) sẽ chờ luôn đợi message từ child-process. 

*) Trên máy tính vật lí, luôn có cấu hình số  luồng gấp đôi số nhân (vd: 2 nhân 4 luồng).
    Thì trong node, mỗi proces sẽ tượng trưng cho 1 luồng.
    Vậy máy 2 nhân 4 luồng, sẽ tương ứng tối đa có thể  tạo 4 process. => CPU core = 4.

    - Nhận định chủ quan :
        + Luồng mặc định mà NodeJS cung cấp là 4 Thread, nhưng số Thread đó chỉ quy định trong môi trường Node - chứ không liên quan gì đến luồng (Thread) của máy tính vật lí.
        + Luồng của máy tính vật lí sẽ tương đương với số Core trong định nghĩa của NodeJS.
        => NodeJS chỉ xử dụng 1 luồng của máy tính vật lí, để làm (single) Process - phục vụ cho việc xử  lí tính toán.
    
    
    
    
# Cluster
- Phân phối công việc đến các tiến trình khác nhau (cân bằng tải) - share port.
    vd: phôi phối lượng 'request' tới các server -> giảm tải khối lượng cho Server.
- Sharing the workload between multiple process.
- Khi 1 request tới, thì 'main process' sẽ phân phối request đó đến 'child process' mà đã connected với 'main process' 
- Xác định thông qua biến môi trường 'process.env.NODE_UNIQUE_ID' <=> số  lượng child_process.
- Xác định Process Master thông qua việc call isMaster property. 
- Cả 'Cluster' và 'Worker' đều return bởi cluster.fork() emit events:
    + 'exit' event  : xác định process stop working.
    + 'online' event: ghi lại log hoạt động activity.
*) Vì các tiến trình con (child process) không chia sẻ (not share memory) bất kỳ bộ nhớ nào nên mỗi tiến trình con cần quản lý môi trường riêng để chạy mã Node.js  => Worker Thread ra đời nhằm giải quyết mục đích share memory giữa các Thread. (Thread sẽ tốn ít tài nguyên hơn so với Process)
+ Mỗi Process tương ứng chạy trên 1 môi trường NodeJS "riêng" -> nó làm tốn bộ nhớ và mất thời gian xử  lí (vì thích riêng nên phải chia sẻ tài nguyên riêng cho mỗi đứa). 
+ Dùng 'workerData' parameter để  send data -> tới 'worker' đc tạo mới.
+ communicate giữa 'worker thread' và 'main thread' dùng "parentPort" - có thể  import bên trong 1 Worker.
+ MessageChannel is used to create a communication path between workers.





- MessageChannel : cung cấp 2 property 'port1' và 'port2' - giúp communicate với các Thread.
    + port1 : đẩy data đến other Thread.
    + port2 : lắng nghe message được gửi về.
- Để transfer data phức tạp thì áp dụng ArrayBuffer








Follow:
    1. xác định cần bao nhiêu Process cho project.  
    2. Main Process có trách nghiệm lắng nghe mọi event và gửi chúng tới các child process quan tâm (có trách nhiệm xử lí task đó).

- Trường hợp khác: thay vì master process 'listen socket' và phân phối cho child process, thì giờ để điều đó (schedule - lên kế hoạch) cho hệ điều hành, các worker chấp nhận kết nối trực tiếp đến (chấp thuận request đến).   
+) Mặc dù lẽ ra nó phải có hiệu suất tốt hơn nhưng việc phân phối có xu hướng mất cân bằng do bộ lập lịch của hệ điều hành đôi khi hoạt động không mong muốn. (điển hình với trường hợp xử lí đồng thời - Promise.all)
    


=== Xử  lý đa luồng ===
1. Quy trình đơn và luồng đơn: Một người ăn thức ăn trên một bàn. 
2. Quy trình đơn và đa luồng: nhiều người ăn cùng nhau trên cùng một bàn. 
3. Đa quy trình và đơn luồng: mỗi người dùng bữa tại bàn riêng của mình.