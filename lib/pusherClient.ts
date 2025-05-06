import Pusher from "pusher-js";

const pusherClient = new Pusher("650a0b080a0fa6ccd9e1", {
  cluster: "ap1",
});

export default pusherClient;
