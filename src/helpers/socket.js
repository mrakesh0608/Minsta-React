import { url } from 'helpers/Path';
import io from "socket.io-client";
const socket = io(url);
export {socket};