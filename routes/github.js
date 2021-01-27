const express = require('express');
const router = express.Router();
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(''); // Insert your hook link here which you got from Discord
hook.setUsername('GitHub Reporter'); // Can be replaced by any other funny name


router.post('/', (req, res, next) => {
    try{
        const event = {
            action: req.headers["x-github-event"],
            name: req.body.repository.name,
            url: req.body.repository["html_url"],
            sender: req.body.sender.login,
            senderImage: req.body.sender["avatar_url"],
            senderLink: req.body.sender["html_url"]
        }
        var embed;
        if(event.action != null || event.action != undefined){
            if(event.sender != null || event.sender != undefined){
                if(event.senderImage != null || event.senderImage != undefined){
                    if(event.senderLink != null || event.senderLink != undefined){
                         embed = new MessageBuilder()
                        .setTitle(event.action)
                        .setAuthor(event.sender, event.senderImage, event.senderLink)
                        .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out at: ' + event.url);
                    }else {
                         embed = new MessageBuilder()
                         .setTitle(event.action)
                         .setAuthor(event.sender, event.senderImage)
                         .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out at: ' + event.url);
                    }
                }else {
                     embed = new MessageBuilder()
                     .setTitle(event.action)
                     .setFooter('Hey! ' + event.sender + ' did action: "' + event.action + '" on your repository: ' + event.name + ' go check it out at: ' + event.url);
                }
            } else {
                 embed = new MessageBuilder()
                 .setTitle(event.action)
                 .setFooter('Hey! Something changed on your repository which I cant handle yet: ' + event.name + ' go check it out at: ' + event.url);
            } 
        } else {
            console.log(event.action);
            console.log(event.name);
            console.log(event.url);
            console.log(event.sender);
            console.log(event.senderImage);
            console.log(event.senderLink);
            embed = new MessageBuilder()
            .setTitle(event.url)
            .setText('Hey! Someone did Something what we didnt handle at the moment');
            
        }

        hook.send(embed);
        res.status(200).json({
            message: 'Everything worked fine',
            messageSendToDiscord: JSON.stringify(embed)
        })
    } catch (err){
        console.error(err);
        res.status(500).json({
            error: err
        })
    };

});

module.exports = router;