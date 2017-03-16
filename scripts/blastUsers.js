import users from './users'
import _ from 'lodash'
import Bot from 'messenger-bot'
import config from './config/defaults.js'

const blastBot = new Bot({
  token: config.token,
  verify: config.verify,
  app_secret: config.app_secret
})

blastBot.on('error', (error) => {
  console.log(error.message)
})


export default (message) => {
  _.map(users, (user) => {
    blastBot.sendMessage(
      user.id,
      {"text" : `Hello ${user.name}, ${message}`},
      (error,info) => {
        console.log(error);
        console.log(info);
      }
    )

  })
}
