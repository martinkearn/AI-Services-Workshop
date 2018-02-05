# Cognitive Services - Computer Vision (Script)
A demo of the vision APIs and some of their functions

### Pre Reqs
* A good quality, portable web cam, set as the default camera
* Computer Vision 'LiveCameraSample' app built and pinned to Start.
* Props for computer vision api: Coffee Cup, Phone etc

### Screens and apps
* Edge > Cognitive, HowHappy, Twins, HowOld
* Intelligent Kiosk app
* Windows Camera app
* Modern skype app

## Intro
High level introduction of vision services as part of the wider cognitive services.

## Computer Vision > Analyse 
1. Go to https://www.microsoft.com/cognitive-services/en-us/computer-vision-api

2. Use the webcam to take a photo of lecturn (coffee cups are good)

3. Upload the photo and analyse (make sure to zoom into results so people at the back can see)
  * Description
  * Tags
  * Adult / racy
  * Categories
  * Colours
  
4. Repeat with a stock portal image

## Computer Vision > Read text in images

1. Return to https://www.microsoft.com/cognitive-services/en-us/computer-vision-api and scroll to the `Read text in images` section

2. Take a photo of the event lanyard or any printed text

3. Upload and show text and json results


## Computer Vision > Read handwritten text from images
1. Return to https://www.microsoft.com/cognitive-services/en-us/computer-vision-api and scroll to `Read handwritten text from images` section (highlight that this is still in preview)

2. Write down on a piece of paper "Good morning Birmingham!"

3. Use the webcam to take a photo of the paper

4. Upload the photo and analyse (make sure to zoom into results so people at the back can see)
  * Preview
  * JSON
  
5. Repeat with a stock portal image


## Computer Vision > Generate Thumbnails
1. Go to https://www.microsoft.com/cognitive-services/en-us/computer-vision-api and scroll to the `Generate a thumbnail` section

2. Take a selfie and joke about being a millenial

3. Toggle smart cropping on and off

## Face
1. Switch to `Intelligent Kiosk`

2. Go to Greeting Kiosk demo and show it recognizing your face, talk about face verification/identification

3. Go to Face API explorer demo and see how old it thinks you are today (!)


## Emotion > Recognize Emotions in Images
1. Go to https://www.microsoft.com/cognitive-services/en-us/emotion-api and scroll to the `Recognize Emotions in Images` section

2. Take a photo of the audience

3. Upload and show the faces

4. Repeat in http://HowHappy.co.uk (don't show the LUIS stuff yet)

## Content Moderator
1. Go to https://www.microsoft.com/cognitive-services/en-us/content-moderator

2. Speak about Cherry Bot (AFC Bournemouth) 

3. Talk to each of the topics
 * Image Moderation
 * Text Moderation
 * Video Moderation
 * Human Review
 
## Video
1. Go to https://www.videoindexer.ai/

2. Select a video (TODO: choose an appropriate video to show)

3. Show how it's picked out people, keywords, and sentiment, that they'll learn more about sentiment in the language session.

4. Switch to transcript and show this

## Lab
1. Go to http://makaton.azurewebsites.net/

2. Upload picture of Andy doing the rabbit sign and show results

3. Navigate to https://www.customvision.ai/ and instruct everyone to do the same.

4. The rest of this lab can be found in lab.md