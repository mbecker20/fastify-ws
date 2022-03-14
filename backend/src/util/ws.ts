import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyWebsocket from "fastify-websocket";
import observable from "./observable";

const ws = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.register(fastifyWebsocket);
  const messageStream = observable<string>();
	app.get(
    "/ws",
    { websocket: true },
    (connection, req) => {
      const unsub = messageStream.subscribe((msg) => connection.socket.send(msg));
      connection.socket.on("message", (message) => {
        messageStream.publish(message.toString());
      });
      connection.socket.on("close", unsub);
    }
  );
	done();
});

export default ws;