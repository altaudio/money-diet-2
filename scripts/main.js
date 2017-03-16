import http from 'http'
import Bot from 'messenger-bot'
import config from './config/defaults.js'
import blastUsers from './blastUsers'

const bot = new Bot({
  token: config.token,
  verify: config.verify,
  app_secret: config.app_secret
})

bot.on('error', (error) => {
  console.log(error.message)
})

bot.on('message', (payload, reply) => {
  const text = payload.message.text
  bot.getProfile(payload.sender.id, (error, profile) => {
    if (error) throw error

    reply({ text: text }, (replyError) => {
      if (replyError) throw replyError

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })

}
)

blastUsers("Have a kitten.");

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
