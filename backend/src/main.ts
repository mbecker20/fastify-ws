import fastify from "fastify";
import ws from "./util/ws";

const app = fastify({ logger: false })
	.register(ws);

app.listen(2000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`fastify-ws listening at ${address}`);
});