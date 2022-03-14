import { Component, createEffect, For } from "solid-js";
import { Message } from "@fastify-ws/types"
import Grid from "./util/layout/Grid";
import Flex from "./util/layout/Flex";

const Messages: Component<{ messages: Message[] }> = (p) => {
	let gridRef: HTMLDivElement | undefined = undefined;
	createEffect(() => {
		if (p.messages && gridRef) {
			gridRef.scrollTop = gridRef.scrollHeight;
		}
	});
	return (
    <Grid
      style={{ "max-height": "80vh", "overflow-y": "scroll" }}
    >
      <Grid ref={gridRef}>
        <For each={p.messages}>
          {(message, i) => (
            <Flex>
              <div style={{ opacity: 0.6 }}>{message.sender}:</div>
              <div>{message.message}</div>
            </Flex>
          )}
        </For>
      </Grid>
    </Grid>
  );
}

export default Messages;