# Language
Cognitive services has a language offering which can be integrated into applications, websites and tools, allowing real-time translation of 60+ supported languages, analysis of sentiment, key phrase extraction, and much more. We’ll also look at an example of how we can add language understanding with LUIS to make our bots and applications smarter.

## Lab - create a machine learning model using the Custom Vision API
In this lab you'll be using Custom Vision to create a machine learning model that can classify whether a person is making the sign for "rabbit" or the sign for "sleep". We'll then test and improve our model using new images.

### Part 1 - Create the language understanding app

1. Navigate to [LUIS](https://www.luis.ai/home), and sign in using the Azure account you created during Martin's [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
2. Create a New App
* Name: Fusion Birmingham
* Culture: English
* Description: How happy language understanding

### Part 2 - Add our entities
As we discussed earlier, there can be many entities in a sentence, but we don't need to identify all of them - only the ones we need in order to do our desired actions. Think of our example utterance "Who is the happiest?".

1. We firstly want to pick out the emotion. We're going to Entities > Create new entity.
* Entity name: emotion
* Entity type: Hierarchical (this is because we have subtypes of emotions, e.g happy, or surprised)
* Select `Add a child entity` and add the following: `anger`, `contempt`, `disgust`, `fear`, `happiness`, `neutral`, `sadness`, `surprise`.

2. Referring back to our example utterance "Who is the happiest?", we also want to pick out this idea of ordering, who is the most happy, who is the third happiest, and so on.
* Go back to Entities and select `Manage prebuilt entities`
* Select `ordinal`. This is ready made for us, so we don't have to add all the ways of saying 'first', '1st', and so on. Note that there are many other prebuilt entities such as money, email, dates and times.

### Part 3 - Add the `MostEmotional` intent
1. The first intent we are going to add is one that will trigger when we want to identify the happiest person, or the angriest - or as we name it here, whoever is the `MostEmotional` in a given scenario.
* Go to Intents and select `Create new intent`
* Intent name: MostEmotional
2. Now we'll add some example utterances and label them.
* Type `Who is the happiest?` and press enter
* Hover over `happiest` so that it is enclosed in square brackets and click
* Tag it as `emotion > happiness`. You'll see the word be replaced, but if you hover over it you can still see the original utterance
* Type `Who is the most happy?`
* Hover over `happy` and tag it with `emotion > happiness`

### Part 4 - Add the `LeastEmotional` intent
1. In contrast to our previous intent, we'll now add an intent that will trigger on 'least emotional', which we'll be able to use in our How Happy app to return essentially who's got the biggest pokerface on.  
* Go to Intents and select `Create new intent`
* Intent name: LeastEmotional
2. Now we'll add some example utterances and label them.
* Type `Who is the least happy?` and press enter
* Tag `happy` with the entity `emotion > happiness`
* Type `Who is the least happy person?`
* Tag `happy` with `emotion > happiness`

### Part 5 - Train our language model
1. Select the `Train` button in the top right of your screen
* Once it has finished training the circle will turn from red to green

### Part 6 - Test our model
1. Select `Test` in the top right of your screen
2. Type `Who is the most happy?` as a test utterance.
* Note that it returns MostEmotional as the intent 
* If you click `inspect` you can see that it has also picked out the correct entity
3. Type `Who is the most angry?` as a test utterance.
* This utterance wasn't part of our training set, however it's picked out MostEmotional as the intent, and the correct emotion entity
4. Try some more tests of your own!

### Part 7 - Add the `SpecificPosition` intent
An example utterance for this intent would be "Show me the second happiest person".
1. Go to Intents and select `Create new intent`
* Intent name: SpecificPosition
2. Add the following example utterances
* `Show me the second happiest person`
* `Show me the third angriest person`
* Label any entities that weren't automatically detected

### Part 8 - Add the `SortedByEmotion` intent
An example utterance for this would be "Show me all the happy people"
1. Go to Intents and select `Create new intent`
* Intent name: SortedByEmotion
2. Add the following example utterances
* `Show me all the happy people`
* `Show me all the angry people`
* Label any entities that weren't automatically detected

### Part 9 - Retrain our language model
1. Select the `Train` button in the top right of your screen

### Part 10 - Re-test our model
1. Select `Test` in the top right of your screen
2. Type `Who is the most happy?` as a test utterance.
3. Type `Who is the most angry?` as a test utterance.
4. Type `Who is the second most happy?`
* Note that the top scoring intent is MostEmotional. We should add some more training data.

### Part 11 - Improve our training data
1. Go to Intents > SpecificPosition
2. Add and tag the following utterances:
* Show me the fourth most happy person
* Show me the third most happy person
* Show me the second angriest person
* Who is the second happiest?
* Who is the third angriest?
* Who is the fifth happiest?
* Show me the fifth happiest person
3. Retrain the model

### Part 12 - Test again!
1. Select `Test` in the top right of your screen
2. Type `Who is the most happy?` as a test utterance.
3. Type `Who is the most angry?` as a test utterance.
4. Type `Who is the second most happy?`
* You should note how adding to training data has improved the confidence and accuracy in detecting the SpecificPosition intent

### Part 13 - Export our model
1. Go to Settings and look at `Versions`. You should see version 0.1 created today, last modified today.
2. Click on the three dots on the right-hand side, and select `Export version`, which will save the model as a .json file.

### Part 14 - Update our version
1. Under `Versions` select `Import new version`, and navigate to the [model.json](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Language/model.json) file in your local directory. 
* Version Name: 0.2
2. Go to Dashboard and look at the App State, this version has 115 labeled utterances.
3. Train the model.
4. Test the model.

What you should note is that as we add training data, the model becomes better at differentiating between the intents. However you should also see that learning is continuous - people communicate the same ideas in different ways so we can continually be adding these new utterances to our model, and see it improve over time and through active use.