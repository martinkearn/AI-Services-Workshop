# Speech and Language
In this session we’ll explore what is possible with the speech based APIs, and see how powerful a custom language model can be for your application. 

## Part 1 - Create a Custom Speech endpoint
First we will create a Custom Speech endpoint that we will use to create our model.
1. Navigate to the [Azure portal](https://ms.portal.azure.com/)
1. Select 'Create a resource'
1. Search for 'Custom Speech (preview)', select, and click Create
* Name: Biology-Demo
* Subscription: (use whatever you are using)
* Location: West US
* Pricing tier: F0
* Resource group: (use whatever you are using)

## Part 2 - Link up the subscription
1. Once the endpoint has deployed, select 'Go to resource'
1. Under 'Grab your keys' select 'Keys', now keep this tab open.
1. In a new tab, navigate to [Custom Speech Service](https://cris.ai), and sign in using the Azure account you created during Martin's [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
1. Select 'Language Models' under 'Custom Speech'
1. Select 'Create New'
1. Select 'Connect existing subscription'
* Name: Biology-Demo (or whatever you named it in the portal)
* Subscription key: (copy Key 1 from the Azure portal)

## Part 3 - Add our Language data
The repository consists of approximately 150 statements about organisms that lived primarily in the Triassic and Jurassic period. The names are in scientific form which rarely appear in everyday language. We're going to add this data now.

1. Go to 'Adaptation Data' under 'Custom Speech'
1. Next to 'Language Datasets' click Import
* Upload 'Language Data.txt' from the Language Adaptation Data folder
* Name: Biology
1. Select Import

## Part 4 - Create our language model
Now that we have our data, we can create a model from it:
1. Go to 'Language Models' under 'Custom Speech'
1. Select 'Create New'
* Name: Biology-Demo
* Description: (none)
* Locale: en-US
* Language data file (.txt): Biology
1. Select Create

## Part 5 - Add our test data
In addition to the language data, the sample contains approximately 50 audio utterances (50 .wav files) which can be used to test the above model using the test feature. There is a transcriptions.tsv file associated with those audio files that captures the transcriptions of each one of them. If you open the file you will see that it contains key value pairs where the name of the file is the key and the transcription the actual value. 

1. Go to the 'Test Data' folder you have locally and create a zipped folder of the test data (right click Test Acoustic Data and select Send to > zipped folder)
1. Go to 'Adaptation Data' under 'Custom Speech'
1. Next to 'Acoustic Datasets' click Import
* Name: Biology
* Description: (none)
* Locale: en-US
* Transcriptions file: ('Transcriptions.txt' in 'Test Data')
* Audio files: ('Test Acoustic Data.zip' in 'Test Data')
1. Select Import


## Part 6 - Add our test data
1. Go to 'Accuracy Test Results' under 'Custom Speech'
1. Select 'Create New'
* Locale: en-US
* Subscription: (whatever you're using)
* Scenario: Universal
* Acoustic Model: Universal
* Language Model: Biology-Demo
* Acoustic Data: Biology
1. Select Create

## Part 7 - Analyse our results
1. Under 'Accuracy Test Results' click 'Details'.

As part of the results page you will see a list of transcriptions (as many as the audio files you uploaded). Read the transcriptions to get a feel of the quality of the results. Remember that the transcriptions.tsv contains the correct transcriptions of all the audio files, so internally our system compares those against both the baseline and the custom models. The improvement over baseline for this sample is typically around 70% and the overall accuracy of the custom model is close to 93%. Needless to say that with a richer language model accuracy can potentially go up.
