const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_redux', {
  logging: false
})

const User = conn.define('user', {
  name: Sequelize.STRING
})

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    User.create({ name: 'Jeremy' }),
    User.create({ name: 'Rachel' }),
    User.create({ name: 'Evan' })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
}
