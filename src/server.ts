import { Server } from "http";
import app from "./app";
import config from "./app/config/config";
import { seedAdmin } from "./app/utils/seedAdmin";

async function main() {
  seedAdmin();
  const server: Server = app.listen(config.port, () => {
    console.log("Sever is running on port ", config.port);
  });
}

main();
