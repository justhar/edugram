import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.app_id as string,
  key: process.env.key as string,
  secret: process.env.secret as string,
  cluster: process.env.cluster as string,
  useTLS: true,
});

export async function POST(request: any, res: any) {
  const body = await request.json();
  const { message, sender } = body;
  await pusher.trigger("chat", "chat-event", {
    message,
    sender,
  });

  res.status(200).json({
    message: "Message sent successfully",
  });
}
