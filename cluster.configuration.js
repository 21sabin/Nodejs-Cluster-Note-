const { notEqual } = require("assert");
const cluster = require("cluster");

//when we run the index.js for the 1st time it is run on the master mode
if (cluster.isMaster) {
  cluster.fork(); //it runs the index.js file again but in the child mode
  //here we can create multiple child with cluster.fork()
  // for the perfomance create child node based on the number of cpu core of your machine
} else {
  const express = rerquire("express");

  const app = express();

  app.listen(3000, () => {});
}

/**
 * Note:
 * - we can deligate task to pm2 for deciding to create the number of child instance creating
 * pm2 start index.js -i 0  // -i 0 means letting pm2 to decinde how many instances to create for us ( it creates n instance based on logical core available to our system)
 *
 * pm2 commands:
 * - pm2 show <server_name> index.js = it shows detail information of child running in cluster
 * - pm2 monit = it give really cool dashboard and gives nie statistics
 *
 * pm2 mnanages the health of the instances
 * pm2 restarts the server if it crashes
 *  */

/**
 * For the better performance of Nodejs there are two approaches
 * 1. Use Node in CLuster mode ( Recommended )
 * 2.User worker Threads (Can use for the experimental puprose)
 * Warning: Do not use 1 and 2 both in same application
 */
