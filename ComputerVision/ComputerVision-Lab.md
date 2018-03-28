# Computer Vision
There is a wealth of information contained in images. Microsoft’s computer vision services help us to understand that visual data as text, such as providing captions, recognizing handwritten text, and identifying emotions. In this session we’ll explore what is possible with the vision based APIs, and see how they’re used in real-world applications. 

In this lab you'll be using Custom Vision to create a machine learning model that can classify whether a person is making the sign for "rabbit" or the sign for "sleep". We'll then test and improve our model using new images.

## 1 - Create the machine learning model
1. Navigate to [Custom Vision](https://www.customvision.ai/), and sign in using the Azure account you created during Martin's [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
2. Create a New Project 
* Name: Fusion Birmingham
* Description: Classifying Makaton signs
* Domains: General
3. Add some training images (these are provided in the [Training Images](https://github.com/martinkearn/AI-Services-Workshop/tree/master/ComputerVision/TrainingImages) folder)
* We're going to start by adding the `Rabbit` training images
* Once the images have uploaded you will be asked to add some tags to this batch of images. We're going to add the tag `rabbit` here (make sure to press the `+` symbol to add the tag)
* Select to `Upload` the 5 files
* Once this is done it should tell us 2 of the images were duplicates
4. Add some more training images
* Now we're going to add the `Sleep` training images using the same method which you can find in the `Sleep` folder
* Once the images have uploaded we can tag them as `sleep`
* Select to `Upload` the 5 files
5. Click the green `Train` model button

## 2 - Testing our model
1. Select `Quick Test` and upload an image
* Either find a willing volunteer to take your picture 
* or navigate to the `TestImages` folder and select one of those

## 3 - Improving our model
1. Navigate to the `Predictions` tab
2. You'll see the images that you tested, if you hover over them you'll see the predictions (right or wrong)
3. Go through and tag these images with their correct labels

## 4 - Retrain the model
1. Select `Train`
* Compare the `Precision` and `Recall` between the iterations