import { PrismaClient } from '@prisma/client'
import { users } from '../lib/users'

const prisma = new PrismaClient()

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
