import fastify from "fastify";
import ws from "./ws";

const app = fastify({ logger: false })
	.register(ws);

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`fastify-ws listening at ${address}`);
});