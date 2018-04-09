# Language
Cognitive services has a language offering which can be integrated into applications, websites and tools, allowing real-time translation of 60+ supported languages, analysis of sentiment, key phrase extraction, and much more. We’ll also look at an example of how we can add language understanding with LUIS to make our bots and applications smarter.

In this lab you'll be using LUIS to create a language model that can classify the intents and entities of an utterance. We'll then test and improve our model using new utterances.

## 1 - Create the language understanding app

1. Navigate to http://aiday.info/Luis, and sign in using the Azure account you created during the [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
1. Create a New App
* Name: AI Workshop
* Culture: English
* Description: Hospital application

## 2 - Add the 'FreeBed' intent
1. The first intent we are going to add is one that will trigger when we want to find a free bed in the hospital which we're going to name the 'FreeBed' intent.
* Go to Intents and select `Create new intent`
* Intent name: FreeBed
1. Now we're going to add some example utterances. Add the following:
* 'Where is there a free bed?'
* 'Where can I find a free bed?'
* 'Is there a bed free?'

## 3 - Add the 'Ward' entity
1. Now it might be the case that we want to search for a bed on a specific ward. That's a piece of information we'd need if we wanted to query our database, so we're going to make an entity to detect it. We're going to go to Entities > Create new entity.
* Entity name: Ward
* Entity type: List. We've selected this one because the ward names in a hospital, for the most part, are a fixed list of values. If a new ward was created it'd be very simple to add it to the list. 
* Values: 1a, 1b, 1c, 2a, 2b, 2c
1. Go back to Intents > FreeBed and enter the following utterances:
* 'Where is there a free bed on ward 1a?'
* 'Where can I find a free bed on ward 1b?'
* 'Is there a bed free on ward 2c?'
You can see that the Ward entity has been automatically tagged because they are pre-defined values in our entity list.

## 4 - Add the 'FindPatient' intent
1. The next intent we're going to add is one that will help us find a specific patient. Let's go to Intents > Create a new intent.
* Intent name: FindPatient
1. Add the following utterances:
* 'Where can I find John Smith'
* 'Where is John Smith?'
* 'Where's John Smith?'
You'll see we've got an entity here that we want to pick out, and that's the name of the patient, so let's make that now.

## 5 - Add the 'PatientName' entity
1. Go to Entities > Create new entity
* Entity name: PatientName
* Entity type: Simple
1. Names come in many different forms, we're going to help our model understand what a name is by providing it some examples. We can do this with a phrase list.
* Go to Phrase lists > Create new phrase list
* Name: Patient
* Copy the list of names from the file 'full-names.txt' and press enter. You'll see them added to the phrase list values.
* Add your name to the list and press enter
* Click save
1. Go back to Intents > FindPatient
* Click on 'John' and then move the cursor over to 'Smith' and click, so that the square braces include the entire name. Label it 'Name'.
* Do the same with the other utterances. 

## 6 - Add the 'DischargeDate' intent
1. The final intent we wish to add is one that will trigger when we want to find out who is due to leave the hospital. Go to Intents > Create a new intent.
* Intent name: DischargeDate
1. Go to Entities > Manage prebuilt entities
* Scroll down to the bottom of the list and select 'datetimeV2'. What this is, is a predefined entity which we can use straight away to detect words relating to date and time. You'll notice there's a lot of other prebuilt entities for example email addresses, phone numbers, urls and so on.
1. Go back to the 'DischargeDate' intent and enter some utterances:
* 'Who is being discharged today?'
* 'Who is going home tomorrow?'
* 'Which patients are going home next week?'
* 'Who is due to go home on Friday?'
* 'Which patients are due to be discharged?'


## 7 - Train the model
1. Click the train button in the upper right!
1. Click the test button in the upper right.
1. Type a test utterance e.g. 'Where is Alice Richards?'

## 8 - Publishing a model
1. Go to 'Publish' in the top right
1. Select 'Publish to production slot' (blue button)
1. Once that's done click on the endpoint url which is at the bottom. You'll see a result which looks like this:
```json
{"query":null,"intents":[],"entities":[]}
```
1. At the end of the url append 'where is there a bed free on ward 1a?' and press enter. You'll see the JSON response:
```json
{
  "query": "where is there a bed free on ward 1a?",
  "topScoringIntent": {
    "intent": "FreeBed",
    "score": 1.0
  },
  "intents": [
    {
      "intent": "FreeBed",
      "score": 1.0
    },
    {
      "intent": "FindPatient",
      "score": 0.00712564448
    },
    {
      "intent": "DischargeDate",
      "score": 0.00711164251
    },
    {
      "intent": "None",
      "score": 0.00588066457
    }
  ],
  "entities": [
    {
      "entity": "1a",
      "type": "WardNo",
      "startIndex": 34,
      "endIndex": 35,
      "resolution": {
        "values": [
          "1a"
        ]
      }
    }
  ]
}
```
* You can see the different intents and their corresponding confidence score - note that our 'FreeBed' intent is the highest scoring by a considerable margin. The detected entities are also listed, and we can see that ward '1a' has been detected, and where in the string.

## 9 - Exporting and importing a model
1. Go to 'My apps' in the top left
1. Find the LUIS project, you'll see 'Culture', 'Created date' and 'Endpoint hits'. Finally there's three dots, click that and select 'Export App'.
* You can use this to share your LUIS model with others. 
1. To import a model, select 'Create new app'.
1. Go to Settings in the top right.
1. Click 'Import new version', select the .json model that was exported, and name it v2.