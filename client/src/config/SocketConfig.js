import { io } from "socket.io-client";
const URL = "http://localhost:4001"; // backend port is 3010
const socket = io(URL, { autoConnect: true, multiplex:false });

// console.log  metele un consola cada ves q se dispare
socket.onAny((eventName, ...args) => {
  console.log(eventName, args);
});

export default socket;