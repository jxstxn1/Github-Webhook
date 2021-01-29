# Github-Webhook
Simple Api to handle GitHub webhooks and redirect them beautiful to Discord

# Getting started:
 - clone the repository on your server: 
 ```sh
 git clone https://github.com/jxstxn1/Github-Webhook.git
 ```
 - get used dependencies:
 ```sh
 npm i
 ```
 
 - enter your Discord Webhook URL into the hook var in the github class
 ```sh
 nano routes/github.js
 ```
 or
 ```sh
 vim routes/github.js
 ```
 or
 ```sh
 vi routes/github.js
 ```
 
 - In your Firewall Settings of the Server open Port 3000 which is required for the API
 
 - Setting up the Webhook in Github:
   In your reposotory or organisatiopm go to Settings>Webhooks>Add Webhook
   Enter into the Payload URL the ip of your server + the port and the route. In the End it should look like:
   11.11.111.11:3000/github
   Use as Content Type: Application/json
   Secret not supported yet
   Choose between one of the 3 event options
   Make sure the Active Checkbox is settet
   Click on "Add webhook"
   
 
Now you're good to go :) 
 
# LICENSE
 - MIT LICENSE
