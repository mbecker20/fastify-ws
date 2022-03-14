import { WS_URL } from "..";

export default function <Message>(onMessage: (message: Message) => void) {
	const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("connection opened");
  };

	socket.onmessage = ({ data }) => {
		onMessage(JSON.parse(data));
	}

	return {
		socket,
		send: (message: object | string) => {
			socket.send(JSON.stringify(message));
		}
	};
}



