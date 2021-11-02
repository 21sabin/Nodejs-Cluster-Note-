const express = require("express");
const crypto = require("crypto");
const app = express();
const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function (message) {
    console.log(message.data);
    res.send("" + message.data);
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000);

// Note: nodemon doesnot work well with cluster so donot use nodemon with cluster

/**
 * When we run our server it is executed in Single Thread
 * ****Nodejs Cluster**********
 * 1 cluster manager is responsible for monitoring the health of multiple server instances that are launched
 * - cluster manager can restart server instance and performs other administrative task
 * when we run index.js from terminal node execute the code and create a first instance which is called cluster manager
 * - after cluster manager is instanciated it creates multiple worker instance which is responsible for handling incoming request
 */
