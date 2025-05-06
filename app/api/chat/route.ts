import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.app_id as string,
  key: process.env.key as string,
  secret: process.env.secret as string,
  cluster: process.env.cluster as string,
  useTLS: true,
});

export async function POST(request: any) {
  const body = await request.json();
  const { message, sender } = body;
  await pusher.trigger("chat", "chat-event", {
    message,
    sender,
  });

  return new Response(JSON.stringify("success"), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
