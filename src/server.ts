import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import config from "./app/config/config";
import { seedAdmin } from "./app/utils/seedAdmin";

// Initialize the Express server
const server: HttpServer = new HttpServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  // Custom events
  socket.on("example_event", (data) => {
    console.log("Received example_event with data:", data);
  });
});

// Start the server
async function main() {
  seedAdmin();

  server.listen(config.port, () => {
    console.log("Server is running on port ", config.port);
  });
}

main();

export { io, server };
