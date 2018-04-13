/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('You reached the default message handler. You said \'%s\'.', session.message.text);
});

bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;

// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 
bot.dialog('GreetingDialog',
    (session) => {
        session.send('You reached the Greeting intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Greeting'
})

bot.dialog('HelpDialog',
    (session) => {
        session.send('You reached the Help intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Help'
})

bot.dialog('CancelDialog',
    (session) => {
        session.send('You reached the Cancel intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Cancel'
})

bot.dialog('FreeBedDialog',
    (session, args) => {
        // Check to see if we have a Ward entity resolved from the utterance
        var entities = args.intent.entities;
        var ward = builder.EntityRecognizer.findEntity(entities, 'Ward');    
        if (ward) {
            session.send('Searching for a free bed in the \'%s\' ward', ward.entity);
        }
        else {
            session.send('Searching for a free bed in all wards');
        }
        
        // Simulate some background processing and display results
        session.sendTyping();
        setTimeout(function () {
            var randomnumber = Math.floor((Math.random() * 10) + 1); 
            session.send("%s free beds found", randomnumber);
        }, 3000);
    }
).triggerAction({
    matches: 'FreeBed'
})

bot.dialog('DischargeDateDialog',
    (session, args) => {
        // Check to see if we have a Ward entity resolved from the utterance
        var entities = args.intent.entities;
        var dateEntity = builder.EntityRecognizer.findEntity(entities, 'builtin.datetimeV2.date');
        var dateOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        
        if (dateEntity) {
            // Always looking for future dates - might get multiple values back if it's ambiguous
            // https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-reference-prebuilt-entities#builtindatetimev2
            var futureDate = new Date(dateEntity.resolution.values.slice(-1)[0]['value']);
            session.send('Searching patients being discharged %s (%s)..', dateEntity.entity, futureDate.toLocaleDateString("en-GB", dateOptions));
        }
        else {
            session.send('Searching patients being discharged this week..');
        }
        
        // Simulate some background lookup and display results
        session.sendTyping();
        setTimeout(function () {
            session.send(":( no patients leaving");
        }, 3000);
    }
).triggerAction({
    matches: 'DischargeDate'
})