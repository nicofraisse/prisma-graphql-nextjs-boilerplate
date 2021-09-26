/* eslint-disable no-console */

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
  {
    email: 'nicolas@email.com',
    name: 'Nicolas Fraisse'
  },
  {
    email: 'esther@email.com',
    name: 'Esther Dufour'
  }
]

const patterns: Prisma.PatternCreateInput[] = [
  {
    name: 'Paradiddle',
    score: 'rlrrlrll'
  },
  {
    name: 'Double Stroke',
    score: 'rrllrrll'
  },
  {
    name: 'Swing Cymbal',
    score: 'x..xxx.xx',
    instrument: 'Cymbal'
  },
  {
    score: '....x...',
    instrument: 'Snare Drum'
  }
]

const grooves: any = [
  {
    name: 'Nice',
    patterns: {
      connectOrCreate: [
        {
          create: {
            name: 'Swing Cymbal',
            score: 'x..xxx.xx',
            instrument: 'Cymbal'
          },
          where: {
            score: 'x..xxx.xx'
          }
        },
        {
          create: {
            score: '....x...',
            instrument: 'Snare Drum'
          },
          where: {
            score: '....x...'
          }
        }
      ]
    }
  }
]

async function main() {
  await prisma.user.deleteMany({})
  await prisma.pattern.deleteMany({})
  await prisma.groove.deleteMany({})
  for (const data of users) {
    await prisma.user.create({ data })
    console.log('Created user:', data.name)
  }
  for (const data of patterns) {
    await prisma.pattern.create({ data })

    console.log('Created pattern:', data.score)
  }
  for (const data of grooves) {
    await prisma.groove.create({ data })
    console.log('Created groove:', data.name)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
