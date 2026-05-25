const { exec } = require("child_process");


const runDockerContainer = (image, clientName) => {

  return new Promise((resolve, reject) => {

    // Unique Container Name
    const uniqueId = Date.now();

    const containerName =
      `${clientName.toLowerCase()}-${uniqueId}`;

    // Docker command
    const command =
      `docker run -d --rm --name ${containerName} ${image}`;

    console.log("Running Command:");
    console.log(command);

    exec(command, (error, stdout, stderr) => {

      if (error) {

        console.log("Docker Error:");
        console.log(error);

        return reject(error.message);
      }

      if (stderr) {

        console.log("Docker STDERR:");
        console.log(stderr);

        return reject(stderr);
      }

      console.log("Docker STDOUT:");
      console.log(stdout);

      resolve({
        containerName,
        containerId: stdout.trim(),
      });
    });  
  });
};


module.exports = {
  runDockerContainer,
};