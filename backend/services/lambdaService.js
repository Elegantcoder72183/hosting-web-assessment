const triggerLambda = async (clientName) => {
  return new Promise((resolve) => {
    console.log(`Lambda triggered for ${clientName}`);

    setTimeout(() => {
      resolve({
        success: true,
      });
    }, 2000);
  });
};

module.exports = {
  triggerLambda,
};
