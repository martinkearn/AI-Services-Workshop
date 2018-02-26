# Language
Cognitive services has a language offering which can be integrated into applications, websites and tools, allowing real-time translation of 60+ supported languages, analysis of sentiment, key phrase extraction, and much more. We’ll also look at an example of how we can add language understanding with LUIS to make our bots and applications smarter.

## Lab - create a LUIS model that can be used in a hospital
In this lab you'll be using LUIS to create a language model that can classify the intents and entities of an utterance. We'll then test and improve our model using new utterances.

### Part 1 - Create the language understanding app

1. Navigate to [LUIS](https://www.luis.ai/home), and sign in using the Azure account you created during Martin's [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
2. Create a New App
* Name: Fusion Birmingham
* Culture: English
* Description: Hospital application

### Part 2 - Add the 'FreeBed' intent
1. The first intent we are going to add is one that will trigger when we want to find a free bed in the hospital which we're going to name the 'FreeBed' intent.
* Go to Intents and select `Create new intent`
* Intent name: FreeBed
2. Now we're going to add some example utterances. Add the following:
* 'Where is there a free bed?'
* 'Where can I find a free bed?'
* 'Is there a bed free?'

### Part 3 - Add the 'Ward' entity
1. Now it might be the case that we want to search for a bed on a specific ward. That's a piece of information we'd need if we wanted to query our database, so we're going to make an entity to detect it. We're going to go to Entities > Create new entity.
* Entity name: Ward
* Entity type: List. We've selected this one because the ward names in a hospital, for the most part, are a fixed list of values. If a new ward was created it'd be very simple to add it to the list. 
* Values: 1a, 1b, 1c, 2a, 2b, 2c
2. Go back to Intents > FreeBed and enter the following utterances:
* 'Where is there a free bed on ward 1a?'
* 'Where can I find a free bed on ward 1b?'
* 'Is there a bed free on ward 2c?'
You can see that the Ward entity has been automatically tagged because they are pre-defined values in our entity list.

### Part 4 - Add the 'FindPatient' intent
1. The next intent we're going to add is one that will help us find a specific patient. Let's go to Intents > Create a new intent.
* Intent name: FindPatient
2. Add the following utterances:
* 'Where can I find John Smith'
* 'Where is John Smith?'
* 'Where's John Smith?'
You'll see we've got an entity here that we want to pick out, and that's the name of the patient, so let's make that now.

### Part 5 - Add the 'Patient' entity
1. Go to Entities > Create new entity
* Entity name: Patient
* Entity type: Simple
2. Names come in many different forms, we're going to help our model understand what a name is by providing it some examples. We can do this with a phrase list.
* Go to Phrase lists > Create new phrase list
* Name: Patient
* Copy the list of names from the file 'full-names.txt' and press enter. You'll see them added to the phrase list values.
* Add your name to the list and press enter
* Click save
3. Go back to Intents > FindPatient
* Click on 'John' and then move the cursor over to 'Smith' and click, so that the square braces include the entire name. Label it 'Name'.
* Do the same with the other utterances. 

### Part 6 - Train the model
1. Click the train button in the upper right!
2. Click the test button in the upper right.
3. Type a test utterance e.g. 'Where is Alice Richards?'