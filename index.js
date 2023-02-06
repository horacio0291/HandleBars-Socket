const { httpServer } = require("./src/socket");

const PORT = 8080;

httpServer
  .listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
  })
  .on("error", (error) => console.log(error));
