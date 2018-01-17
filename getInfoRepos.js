const feed = require('feed-read-parser')
const moment = require('moment')
const _ = require('lodash')

require('dotenv').load()
const promotion = process.env.PROMOTION
const projects = require(`../data/projects/${promotion}.json`)

const getFeed = ({ repo }) => repo + '/commits/master.atom'
const urls = projects.map( project => {
  if ( Array.isArray(project.repo) ) {
    project.repo.map( repo => getFeed)
  }
})

const feedPromise = () => {
  return new Promise((resolve, reject) => {
    feed(urls, function (err, articles) {
      if (err) throw err
      let filteredProjects = []
      projects.forEach(({ repo }) => {
        filteredProjects.push(articles.find(({link}) => link.includes(repo)))
      })

      filteredProjects = filteredProjects
                            .map((project, index) => {
                              project.publishedTimestamp = moment(project.published).unix()
                              project.owner = projects[index].student
                              project.icon = projects[index].icon
                              project.url = projects[index].repo
                              project.demo = projects[index].demo
                              return project
                            })

      const orderedProjects = _.orderBy(filteredProjects, ['publishedTimestamp'], ['asc'])
      const reposStatus = orderedProjects.map(project => {
        let { url, demo, icon, owner, title, author, published, feed: { name: nameRepo } } = project
        const timeAgo = moment(published).startOf('hour').fromNow()
        nameRepo = nameRepo.split(' ').pop().split(':')[0]

        const titleMsg = `<${demo}|${icon}> <${url}|${nameRepo}> (${owner})`
        const textMsg = `${title} by @${author} =>  ${timeAgo}`

        const finalStatus = { titleMsg, textMsg }
        console.log(finalStatus)
        return finalStatus
      })

      resolve(reposStatus)
    })
  })
}

module.exports = feedPromise
