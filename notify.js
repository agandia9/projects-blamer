'use strict'

const _ = require('lodash')
const IncomingWebhook = require('@slack/client').IncomingWebhook;
const getInfoRepos = require('./getInfoRepos')

require('dotenv').config()
const WEBHOOK_URL = process.env.WEBHOOK_URL
const ICON_EMOJI = ':point_up:'

var webhook = new IncomingWebhook( WEBHOOK_URL );

getInfoRepos().then( infoRepos => {

    const msgDefaults = {
      text: `Today, status of projects is... `,
      responseType: 'in_channel',
      username: 'ProjectsBlamer',
      iconEmoji: ICON_EMOJI
    }

    var attachments = infoRepos.map(({ titleMsg, textMsg }) => {
      return {
        title: titleMsg,
        text: textMsg,
        mrkdwn_in: ['text', 'pretext']
      }
    })

    let msg = _.defaults({ attachments: attachments }, msgDefaults)

    webhook.send(msg, (err, res) => {
      if (err) throw err
      console.log(`\n🚀  ProjectsBlamer report delivered 🚀`)
    })
  })
  .catch( function(err) {
    throw err
  })
