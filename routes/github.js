const express = require('express');
const router = express.Router();
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook('Insert your Discord Web-Hook URL Here');
const IMAGE_URL = '../images/GitHub-Mark-120px-plus.png';
hook.setUsername('GitHub Reporter'); // Can be replaced by any other funny name


router.post('/', (req, res, next) => {
    try{
        const event = {
            action: req.body.action,
            name: req.body.repository.name,
            url: req.body.repository.url,
            sender: req.body.sender.login,
            senderImage: req.body.sender.avatar_url,
            senderLink: req.body.sender.html_url
        }
        if(event.action != null || event.action != undefined){
            if(event.sender != null || event.sender != undefined){
                if(event.senderImage != null || event.senderImage != undefined){
                    if(event.senderLink != null || event.senderLink != undefined){
                        const embed = new MessageBuilder().setTitle(event.action).setAuthor(event.sender, event.senderImage, event.senderLink).setText('Hey!: ' + event.sender + ' did' + event.action + 'on your repository:' + event.name).setUrl(event.url);
                    }else {
                        const embed = new MessageBuilder().setTitle(event.action).setAuthor(event.sender, event.senderImage).setText('Hey!: ' + event.sender + ' did' + event.action + 'on your repository:' + event.name).setUrl(event.url);
                    }
                }else {
                    const embed = new MessageBuilder().setTitle(event.action).setAuthor('GitHub Reporter', IMAGE_URL).setText('Hey!: ' + event.sender + ' did' + event.action + 'on your repository:' + event.name).setUrl(event.url);
                }
            } else {
                const embed = new MessageBuilder().setTitle(event.action).setAuthor('GitHub Reporter', IMAGE_URL).setText('Hey!: ' + event.sender + ' did' + event.action + 'on your repository:' + event.name).setUrl(event.url);
            } 
        } else {
            const embed = new MessageBuilder().setTitle(event.action).setAuthor('GitHub Reporter', IMAGE_URL).setText('Hey!: Someone did Something what we didnt handle at the moment').setUrl(event.url);
        }
        hook.send(embed);
        res.status(200).json({
            message: 'Everything worked fine'
        })
    } catch (err){
        console.error(err);
        res.status(500).json({
            error: err
        })
    };

});

module.exports = router;