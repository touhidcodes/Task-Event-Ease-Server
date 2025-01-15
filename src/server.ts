import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import config from "./app/config/config";
import { seedAdmin } from "./app/utils/seedAdmin";

// Initialize the Express server
const server: HttpServer = new HttpServer(app);

// Initialize Socket.IO
export const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "https://event-ease-web.vercel.app"],
    methods: ["GET", "POST"],
  },
});

async function main() {
  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  server.listen(config.port, async () => {
    await seedAdmin();
    console.log("Server is running on port ", config.port);
  });
}

main();

// Export a default handler for Vercel
export default (req: any, res: any) => {
  app(req, res);
};
