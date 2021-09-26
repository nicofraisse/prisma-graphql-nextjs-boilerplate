import { objectType } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
  }
})

const Groove = objectType({
  name: 'Groove',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.int('goalTempo')
    t.nullable.int('startTempo')
    t.field('patterns', {
      type: 'Pattern',
      resolve: (parent) =>
        prisma.groove
          .findUnique({ where: { id: Number(parent.id) } })
          .patterns()
    })
  }
})

const Pattern = objectType({
  name: 'Pattern',
  definition(t) {
    t.int('id')
    t.string('score')
    t.string('name')
    t.string('instrument')
  }
})

export default [User, Groove, Pattern]
