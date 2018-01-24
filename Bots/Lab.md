# Bots
Bots are a new type of App. One which fundamentally changes we the way we interact with our devices. Bots will lead to a world where we are using natural language to interact with device and services. Microsoft are investing heavily in bots with the Microsoft Bot Framework and Azure Bot Service. In this talk we'll look at what a bot is, design patterns for bots and the Microsoft Bot Framework which lets you write a single bot that is published to multiple social channels such as Skype, Facebook and Slack.

## Lab - create a new Azure Bot Service with natural language understanding capability
In this lab you'll be creating your very own chatbot which is publically accessible and that can understand users using Microsoft Cognitive Services.

### Part 1 - Create Azure Bot Service

1. Navigate to the [Azure Portal](https://portal.azure.com), Create a new resource, select AI + Cognitive Services and Web App Bot
2. Create a unique Bot name and select a new Resource Group called "RG-BotLab", 
3. Within Bot template - select your desired SDK language: C# or Node.js
4. Select "Language understanding" template
5. Complete the other required fields

> Wait a few minutes for the provisioning to complete, then open the resource group.

6. Open the Web App Bot you have created within the resource group and select the Application Settings

### Part 2 - Create Language understanding model
Let's add some AI to the bot, so that it can understand it's human users.  In this example, the model will be able to determine between simple greetings and be able to calculate time.

1. Navigate to the [Luis portal](https://luis.ai)
2. Open the new model that has been provisioned for you
3. Open the Greeting intent and add as many new utterances for saying welcome you can think of that aren't already added by default eg.
    * Yo
    * Sup
    * Hey
4. Select Manage prebuilt entities, select datetimev2
5. Add another new intent called "Time", add as many ways of asking for the time eg.
    * What is the time?
    * Tell me the time
    * Give me the time?    
6. The Time intent will also be able to calculate time differences if the user specifies a time period.  So add a few ways the user may ask this eg.
    * How long until 31st August 2019
    * What was the date yesterday?
    * What is the date next Saturday?
7. Train the model
8. Within the Publish tab, take a note of the resources and keys that have been automatically setup within the region you selected when you created the Azure Resource Group.  Here you can see the LUIS API key and app guid within the endpoint url eg:
https://westeurope.api.cognitive.microsoft.com/api/v2.0/apps/bc12afb6-af83-449e-8add-be96961a876b?subscription-key=1113901549614ef893ea757807e79c00&verbose=true&timezoneOffset=0&q= 

> As part of the template you've used, the Bot has already been wired up to > the LUIS model, you can check this within the App Settings within the Azure portal for Web App Bot.  You'll notice the same keys from following:

> | App setting | Value |
> | ----- | ----- |
> | LuisAPIKey | 1113901549614ef893ea757807e79c00 |
> | LuisAppId | bc12afb6-af83-449e-8add-be96961a876b |
> | LuisAPIHostName | westeurope.api.cognitive.microsoft.com |

### Part 4 - Creating some custom logic within your bot using VS Code
Now we need to handle the LUIS intents that will be resolved by our LUIS model.  This is the code that will get fired when any LUIS intent is detected.

1. Within Azure Portal, Web App Bot, select the Build tab and "Download zip file", extract the zip file contents to a local folder.
2. Open VS Code and open the folder containing your bot code
3. If using Node.js open the app.js file