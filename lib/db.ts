import prisma from "./prisma";

export async function getGlobalChat() {
  return await prisma.globalChat.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export async function sendGlobalChat(sender: string, message: string) {
  return await prisma.globalChat.create({
    data: {
      message,
      sender,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    },
  });
}

export async function getUserProfile(email: string) {
  const decodedId = decodeURIComponent(email);
  console.log(decodedId);
  const user = await prisma.user.findUnique({
    where: {
      email: decodedId,
    },
  });
  if (!user) {
    return null;
  } else {
    return user;
  }
}

export async function getUserPosts(email: string) {
  const decodedId = decodeURIComponent(email);
  return await prisma.post.findMany({
    where: {
      authorId: decodedId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function postPost(email: string, title: string, content: string) {
  return await prisma.post.create({
    data: {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      title,
      content,
      authorId: email,
    },
  });
}

export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

export async function postComment(
  postId: string,
  email: string,
  content: string
) {
  return await prisma.comment.create({
    data: {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      content,
      postId,
      authorId: email,
    },
  });
}

export async function getComment(postId: string) {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
