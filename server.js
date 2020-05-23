const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://assets.gitlab-static.net/uploads/-/system/user/avatar/4972476/avatar.png?width=90",
        name: "Paulo Beckman",
        role: "Graduando de Ciência da Computação - Programador",
        description: 'Programador no laboratório mídias eletronicas na Universidade Federal do Oeste do Pará - <a href="http://www.ufopa.edu.br/ufopa/" target="_blank">UFOPA</a>',
        links: [
            { name: "Github", url: "https://github.com/paulobeckman" },
            { name: "Twitter", url: "https://twitter.com/paulobeckman" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/paulo-beckman-08b87b146" }
        ]
    }


    return res.render( "about", { about })
})

server.get("/portfolio", function (req, res) {

    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send ("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function () {
    console.log("server is running")
})