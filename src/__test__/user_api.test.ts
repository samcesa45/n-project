import bcrypt from 'bcrypt'
import helper from './test_helper.test'
import User from '../models/user'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach( async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username:'root',passwordHash,name:'user1' })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const passwordHash = await bcrypt.hash('salainen', 10)
    await bcrypt.compare(passwordHash,'salainen')

    const newUser = {
      username:'mluukkai',
      name:'Matti Luukkainen',
      password:passwordHash
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type',/application\/json/)

    const userAtEnd =  await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username:'root',
      name:'Superuser',
      password:'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})