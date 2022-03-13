import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyWebsocket from "fastify-websocket";

const ws = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.register(fastifyWebsocket);
	app.get(
    "/",
    { websocket: true },
    (connection, req) => {
      connection.socket.on("message", (message) => {
				console.log(message)
        connection.socket.send("hi from server");
      });
    }
  );
	done();
});

export default ws;