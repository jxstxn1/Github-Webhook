const express = require('express');
const router = express.Router();
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(''); // Insert your hook link here which you got from Discord
hook.setUsername('GitHub Reporter'); // Can be replaced by any other funny name


router.post('/', (req, res, next) => {
    try {
        const event = {
            action: req.headers["x-github-event"],
            name: req.body.repository.name,
            url: req.body.repository["html_url"],
            sender: req.body.sender.login,
            senderImage: req.body.sender["avatar_url"],
            senderLink: req.body.sender["html_url"]
        }
        var embed;
        if (event.action != null || event.action != undefined && event.sender != null || event.sender != undefined && vent.senderImage != null || event.senderImage != undefined && vent.senderLink != null || event.senderLink != undefined) {
            console.log(event.action);
            if (event.action === "pull_request") {
                embed = new MessageBuilder()
                    .setTitle(event.action.toUpperCase() + ' at: ' + event.url)
                    .setAuthor(event.sender, event.senderImage, event.senderLink)
                    .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out! Description: ' + req.body["pull_request"].title);
            } else if (event.action === "push") {
                var commitDescriptions = "";
                req.body.commits.forEach(commit => {
                    commitDescriptions = commitDescriptions + commit.message + ", ";
                })
                embed = new MessageBuilder()
                    .setTitle(event.action.toUpperCase() + ' at: ' + event.url)
                    .setAuthor(event.sender, event.senderImage, event.senderLink)
                    .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out! Description: ' + commitDescriptions);
            } else {
                embed = new MessageBuilder()
                    .setTitle(event.action.toUpperCase() + ' at: ' + event.url)
                    .setAuthor(event.sender, event.senderImage, event.senderLink)
                    .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out!');
            }
        } else {
            embed = new MessageBuilder()
                .setTitle(event.url)
                .setText('Hey! Someone did Something what we didnt handle at the moment');

        }
        console.log(JSON.stringify(embed));
        hook.send(embed);
        res.status(200).json({
            message: 'Everything worked fine',
            messageSendToDiscord: JSON.stringify(embed)
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        })
    };

});

module.exports = router;