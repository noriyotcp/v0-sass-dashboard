import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type UserParams = Pick<Prisma.UserCreateInput, "name" | "username" | "email">;
type PostParams = Pick<
  Prisma.PostCreateInput,
  "id" | "title" | "content" | "published"
>;

const users: UserParams[] = [
  {
    name: "Leanne Graham",
    username: "bret",
    email: "leanne-graham@example.com",
  },
  {
    name: "Ervin Howell",
    username: "antonette",
    email: "ervin-howell@example.com",
  },
  {
    name: "Clementine Bauch",
    username: "samantha",
    email: "clementine-bauch@example.com",
  },
];

const posts: PostParams[] = [
  {
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content:
      "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
    published: true,
  },
  {
    title: "qui est esse",
    content:
      "est rerum tempore vitae↵sequi sint nihil reprehenderit dolor beatae ea dolores neque↵fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis↵qui aperiam non debitis possimus qui neque nisi nulla",
    published: true,
  },
  {
    title: "This is a draft",
    published: false,
  },
];

async function main() {
  users.forEach(async (user) => {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
    console.log({ user });
  });

  posts.forEach(async (post) => {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
    });
    console.log({ post });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
