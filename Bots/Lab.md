# Bots
Bots are a new type of App. One which fundamentally changes we the way we interact with our devices. Bots will lead to a world where we are using natural language to interact with device and services. Microsoft are investing heavily in bots with the Microsoft Bot Framework and Azure Bot Service. In this talk we'll look at what a bot is, design patterns for bots and the Microsoft Bot Framework which lets you write a single bot that is published to multiple social channels such as Skype, Facebook and Slack.

## Lab - create a new Azure Bot Service with natural language understanding capability
In this lab you'll be creating your very own chatbot which is publically accessible and that can understand users using Microsoft Cognitive Services.

### Part 1 - Create Azure Bot Service

1. Navigate to the [Azure Portal](https://portal.azure.com), Create a new resource, select AI + Cognitive Services and Web App Bot
2. Choose a unique Bot name and select a new Resource Group called `RG-BotLab`, 
3. Within Bot template - select your desired SDK language: C# or Node.js
4. Select "Language understanding" template
5. Change the LUIS App location to West Europe
6. Complete the other required fields

> Wait a few minutes for the provisioning to complete, then open the resource group

7.  Look at the resources that have been provisioned for you:

> | Type | Value |
> | ----- | ----- |
> | Web App Bot | Azure Bot Service registration |
> | App Service | API Endpoint the Azure Bot Service sends messages to/from |
> | Application Insights | Telemetry & error data for the bot |
> | Storage account | Bot state |

### Part 2 - Create Language understanding model
A basic bot has now been provisioned for you, now let's add some AI to it, so that it can understand it's human users.  In this example, the model will be able to determine simple greetings and be able to tell the current and future date and times.

1. Navigate to the [Luis portal](https://luis.ai)
2. Open the new model that has been provisioned for you
3. Open the Greeting intent and add as many new utterances for saying welcome you can think of that aren't already added by default eg.
    * Yo
    * Sup
    * Hey
4. Select Entities - Manage prebuilt entities, select datetimev2
5. Add another new intent called `Time`, add as many ways of asking for the time eg.
    * What is the date?
    * Tell me the time
    * Give me the time?
    * What date is it?  
6. The Time intent will also be able to determine the date even if the user specifies a time phrase.  So add a few ways the user may ask this eg.
    * What is the date today?
    * What was the date yesterday?
    * What is the date next Saturday?
7. Train the model
8. Publish the model - Within the Publish tab, take a note of the resources and keys that have been automatically setup within the region you selected when you created the Azure Resource Group.  Here you can see the LUIS API key and app guid within the endpoint url eg:
https://westeurope.api.cognitive.microsoft.com/api/v2.0/apps/{yourappid}?subscription-key={yourapikey}&verbose=true&timezoneOffset=0&q= 

> As part of the template you've used, the Bot has already been wired up to > the LUIS model, you can check this within the App Settings within the Azure portal for Web App Bot.  You'll notice the same keys from following:

> | App setting | Value |
> | ----- | ----- |
> | LuisAppId | {yourappid} |
> | LuisAPIKey | {yourapikey} |
> | LuisAPIHostName | westeurope.api.cognitive.microsoft.com |

### Part 4 - Creating some custom logic within your bot using VS Code
Now we need to handle the LUIS intents that will be resolved by our LUIS model.  This is the code that will get fired when any LUIS intent is detected.

---

## Node.js
1. Within Azure Portal, Web App Bot, select the Build tab and "Download zip file", extract the zip file contents to a local folder.
2. Open VS Code and open the folder containing your bot code
3. Within the Terminal window (or from the commmand line) run:
```
npm install
```
4. Add a launch file containing the environment variables for debug (in this case, we'll just use the ones already provisioned).  Add the following section using values from the Bot App Settings above:
```json
"program": "${workspaceFolder}\\app.js",
"env": {
    "LuisAppId": "{yourappid}",
    "LuisAPIKey": "{yourapikey}",
    "LuisAPIHostName": "westeurope.api.cognitive.microsoft.com",
    "AzureWebJobsStorage": "{yourwebjobsstorage}"
}
```
5. Open the app.js file and add the logic for the `Time` intent eg:
```js
.matches('Time', (session, args) => {
     // Check to see if we've been passed a time period
     var entities = args.entities;
     var dateEntity = builder.EntityRecognizer.findEntity(entities, 'builtin.datetimeV2.date');
     var dateOptions = { year: 'numeric', month: 'long', day: '2-digit' };
     
    if (dateEntity) {
        // Always looking for future dates - might get multiple values back if it's ambiguous
        // https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-reference-prebuilt-entities#builtindatetimev2
        var futureDate = new Date(dateEntity.resolution.values.slice(-1)[0]['value']);
        session.send('The date %s is %s', dateEntity.entity, futureDate.toLocaleDateString("en-GB", dateOptions));
    }
    else {
        session.send('The current date and time is %s', new Date().toUTCString(dateOptions))
    }
})
```
6. Download and run [botframework-emulator](https://emulator.botframework.com/)
Connect the emulator to http://localhost:3987/api/messages (no App ID/Password requried)
7. Test the different intents in the bot
8. Publish the changes to your production bot, within VS Code or from the command line run (can take a few minutes):
```
node publish.js
```
9. Return to the Azure portal and open "Test in Web Chat", test your production bot to make sure it runs the latest code.

10. (Bonus task if time).  Now lets add support for more date phrases supported by LUIS datetimeV2 such as "in 3 weeks".  Change the code to the following:
```js
.matches('Time', (session, args) => {
    // Check to see if we've been passed a time period
    var entities = args.entities;
    var dateEntity = builder.EntityRecognizer.findEntity(entities, 'builtin.datetimeV2.date');
    var dateOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    
   if (dateEntity) {
       // Always looking for future dates - might get multiple values back if it's ambiguous
       // https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-reference-prebuilt-entities#builtindatetimev2
       var futureDate = new Date(dateEntity.resolution.values.slice(-1)[0]['value']);
       session.send('The date %s is %s', dateEntity.entity, futureDate.toLocaleDateString("en-GB", dateOptions));
   }
   else {
        // Look for date ranges eg. "in 3 weeks"
        var dateRange = builder.EntityRecognizer.findEntity(entities, 'builtin.datetimeV2.daterange');
        if (dateRange)
        {
            var futureDate = new Date(dateRange.resolution.values.slice(-1)[0]['end']);
            session.send('The date %s is %s', dateRange.entity, futureDate.toLocaleDateString("en-GB", dateOptions));
        }
        else
        {
            session.send('The current date and time is %s', new Date().toUTCString(dateOptions))
        }
    }
})
```
---

## C#
1. Within Azure Portal, Web App Bot, select the Build tab and "Download zip file", extract the zip file contents to a local folder.
2. Open Visual Studio and open the solution in the folder containing your bot code
3. Right click on the solution folder and select "Restore Nuget Packages"
4. Edit the web.config file to add the environment variables for debug (in this case, we'll just use the ones already provisioned).  Add the following section using values from the Bot App Settings above:
```xml
    <add key="LuisAppId" value="{yourappid}"/>
    <add key="LuisAPIKey" value="yourkey"/>
    <add key="LuisAPIHostName" value="westeurope.api.cognitive.microsoft.com"/>
    <add key="AzureWebJobsStorage" value="yourwebjobsstorage"/}
```
5. Open the BasicLuisDialog.cs file and add the logic for the `Time` LUIS intent eg:
```csharp
[LuisIntent("Time")]
public async Task TimeIntent(IDialogContext context, LuisResult result)
{
    string msg = "";
    EntityRecommendation dateEntity = new EntityRecommendation();
    if (result.TryFindEntity("builtin.datetimeV2.date", out dateEntity))
    {
        if (dateEntity.Resolution.Any())
        {
            // Get the collection of objects at index 0 where the KVP is
            var resolutionList = dateEntity.Resolution.Values?.ToList()[0] as List<object>;

            // Always looking for future dates - might get multiple values back if it's ambiguous
            // https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/luis-reference-prebuilt-entities#builtindatetimev2
            var keyValPairsList = resolutionList[resolutionList.Count - 1] as Dictionary<string, object>;

            DateTime futureDate = Convert.ToDateTime(keyValPairsList["value"].ToString());
            msg = $"The date {dateEntity.Entity} = {futureDate.ToLongDateString()}";
        }
    }
    else
    {
        msg = $"The current date and time is {DateTime.Now.ToLocalTime()}";
    }
    await context.PostAsync(msg);
    context.Wait(MessageReceived);
}
```
6. Download and run [botframework-emulator](https://emulator.botframework.com/)
Connect the emulator to http://localhost:3984/api/messages (no App ID/Password requried)
7. Test the different intents in the bot
8. Publish the changes to your production bot, within Visual Studio or from the command line run (can take a few minutes):
```
publish.cmd
```
9. Return to the Azure portal and open "Test in Web Chat", test your production bot to make sure it runs the latest code.

