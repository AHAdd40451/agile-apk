import { io } from "socket.io-client";
const socket = io.connect("https://afsg-api-dot-afsg-382716.uc.r.appspot.com");
export default socket;