import { Message } from "@fastify-ws/types";
import { Component, createEffect, createSignal, Show } from "solid-js";
import websocket from "../../util/ws";
import Messages from "../Messages";
import Input from "../util/Input";
import Flex from "../util/layout/Flex";
import Grid from "../util/layout/Grid";
import styles from "./App.module.css";

const App: Component = () => {
  const [protoName, setProto] = createSignal("");
  const [name, setName] = createSignal("");
  const [input, setInput] = createSignal("");
  const [messages, setMessages] = createSignal<Message[]>([]);
  let inputRef: HTMLInputElement | undefined = undefined;
  createEffect(() => {
    if (name()) {
      inputRef?.focus();
    }
  })
  const ws = websocket<Message>((message) => {
    setMessages((messages) => [...messages, message]);
  });
  const sendMessage = () => {
    if (input().length > 0) {
      ws.send({ sender: name(), message: input() });
      setInput("");
    }
  };
  return (
    <div class={styles.App}>
      <Show
        when={name().length > 0}
        fallback={
          <Flex>
            <Input
              autofocus
              onConfirm={(name) => {
                if (name.length > 0) {
                  setName(name);
                }
              }}
              onEdit={setProto}
            />
            <button
              onClick={() => {
                if (protoName().length > 0) {
                  setName(protoName());
                }
              }}
            >
              set
            </button>
          </Flex>
        }
      >
        <Grid style={{ "font-size": "2rem" }}>
          <Flex>
            <div style={{ opacity: 0.6 }}>name: </div>
            <div>{name()}</div>
          </Flex>
          <Flex>
            <Input
              ref={inputRef}
              value={input()}
              onConfirm={sendMessage}
              onEdit={setInput}
            />
            <button>send</button>
          </Flex>
          <Messages messages={messages()} />
        </Grid>
      </Show>
    </div>
  );
};

export default App;
