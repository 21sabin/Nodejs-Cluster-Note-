// by default theread pool size is 4

process.env.UV_THREADPOOL_SIZE = 1;

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

//http request is not assigned to libuv thread pool
//instead this http job is delagated to OS
function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

//hashing is assiged to thread
function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

//read file is also assigned to thread
// after assigning to thread , it identify that this task is going to take time therefore thread leave read file system to complete and thread becomes free
// now it checks if there is any other task in the queue , if there is task that task will be assigned to thread and starts to execute
// afeter completed that task previous file read task will be assiged to task if that was completed
fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
