import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type UserParams = Pick<Prisma.UserCreateInput, 'name' | 'username' | 'email'>

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
    })
    console.log({ user })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
