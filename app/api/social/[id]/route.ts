import {
  getGlobalChat,
  sendGlobalChat,
  getUserProfile,
  getUserPosts,
  getAllPosts,
  postPost,
  postComment,
  getPost,
  getComment,
} from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  switch (id) {
    case "getglobalchat":
      return await getGlobalChat().then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "getuserprofile":
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email") || "";
      return await getUserProfile(decodeURIComponent(email)).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "getuserposts":
      const { searchParams: searchParams2 } = new URL(request.url);
      const email2 = searchParams2.get("email") || "";
      return await getUserPosts(decodeURIComponent(email2)).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "getallposts":
      return await getAllPosts().then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "getpost":
      const { searchParams: searchParams3 } = new URL(request.url);
      const postId = searchParams3.get("postId") || "";
      return await getPost(postId).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "getcomment":
      const { searchParams: searchParams4 } = new URL(request.url);
      const postId2 = searchParams4.get("postId") || "";
      return await getComment(postId2).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 'a', 'b', or 'c'

  switch (id) {
    case "sendglobalchat":
      const { sender, message } = await request.json();
      return await sendGlobalChat(sender, message).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "postpost":
      const { email, title, content } = await request.json();
      return await postPost(email, title, content).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    case "postcomment":
      const { postId, mail, body } = await request.json();
      return await postComment(postId, mail, body).then((data) => {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
  }
}
