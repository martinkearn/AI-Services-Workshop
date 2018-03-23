/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
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
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {
    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
})
.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
})
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
.matches('FreeBed', (session, args) => {
     // Check to see if we have a Ward entity resolved from the utterance
     var entities = args.entities;
     var ward = builder.EntityRecognizer.findEntity(entities, 'Ward');    
     if (ward) {
        session.send('Searching for a free bed in the \'%s\' ward..', ward.entity);
    }
    else {
        session.send('Searching for a free bed in all wards..');
    }
    
    // Simulate some background lookup and display results
    session.sendTyping();
    setTimeout(function () {
        var randomnumber=Math.floor((Math.random() * 10) + 1); 
        session.send("%s free beds found", randomnumber);
    }, 3000);
})
.matches('DischargeDate', (session, args) => {
     // Check to see if we've been passed a time period
     var entities = args.entities;
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
})

/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);