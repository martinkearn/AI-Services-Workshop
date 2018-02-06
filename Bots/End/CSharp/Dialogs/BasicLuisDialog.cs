using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.Luis;
using Microsoft.Bot.Builder.Luis.Models;

namespace Microsoft.Bot.Sample.LuisBot
{
    // For more information about this template visit http://aka.ms/azurebots-csharp-luis
    [Serializable]
    public class BasicLuisDialog : LuisDialog<object>
    {
        public BasicLuisDialog() : base(new LuisService(new LuisModelAttribute(
            ConfigurationManager.AppSettings["LuisAppId"], 
            ConfigurationManager.AppSettings["LuisAPIKey"], 
            domain: ConfigurationManager.AppSettings["LuisAPIHostName"])))
        {
        }

        [LuisIntent("None")]
        public async Task NoneIntent(IDialogContext context, LuisResult result)
        {
            await this.ShowLuisResult(context, result);
        }

        // Go to https://luis.ai and create a new intent, then train/publish your luis app.
        // Finally replace "Gretting" with the name of your newly created intent in the following handler
        [LuisIntent("Greeting")]
        public async Task GreetingIntent(IDialogContext context, LuisResult result)
        {
            await this.ShowLuisResult(context, result);
        }

        [LuisIntent("Cancel")]
        public async Task CancelIntent(IDialogContext context, LuisResult result)
        {
            await this.ShowLuisResult(context, result);
        }

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

                    // Date resolution can return more than 1 result for past and future dates - we're always looking forward here
                    // so get the last index value: https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/pre-builtentities
                    // We can can multiple records back here - looking forward, so get the last one
                    var keyValPairsList = resolutionList[resolutionList.Count - 1] as Dictionary<string, object>;

                    // Check if we have an ambiquous date (XXXX) if so then replace with the year we extracted above
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

        private async Task ShowLuisResult(IDialogContext context, LuisResult result) 
        {
            await context.PostAsync($"YO O Y YO YO Y Ohave reached {result.Intents[0].Intent}. You said: {result.Query}");
            context.Wait(MessageReceived);
        }
    }
}