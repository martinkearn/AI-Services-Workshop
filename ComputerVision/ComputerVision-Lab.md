# Computer Vision
There is a wealth of information contained in images. Microsoft’s computer vision services help us to understand that visual data as text, such as providing captions, recognizing handwritten text, and identifying emotions. In this session we’ll explore what is possible with the vision based APIs, and see how they’re used in real-world applications.

In this lab you'll be using Custom Vision to create a machine learning model that can classify whether a person is making the Makaton sign for "rabbit" or the sign for "sleep". We'll then test and improve our model using new images.

## Part 1 - Create the machine learning model
In this section, we'll create a custom vision model based on Makaton signs.

1. Navigate to [Custom Vision](https://www.customvision.ai/) (AIDay.info/CustomVision), and sign in using the Azure account you created during Martin's [Setup](https://github.com/martinkearn/AI-Services-Workshop/blob/master/Setup/Lab.md) session.
1. Create a New Project 
* Name: `Makaton`
* Description: `Classifying Makaton signs`
* Domains: `General`
1. Add some training images (these are provided in the [Training Images](https://github.com/martinkearn/AI-Services-Workshop/tree/master/ComputerVision/TrainingImages) folder)
* We're going to start by adding the `Rabbit` training images
* Once the images have uploaded you will be asked to add some tags to this batch of images. We're going to add the tag `rabbit` here (make sure to press the `+` symbol to add the tag)
* Select to `Upload` the 5 files
1. Add some more training images
* Now we're going to add the `Sleep` training images using the same method. You can find these images in the `Sleep` folder.
* Once the images have uploaded we can tag them as `sleep`
* Select to `Upload` the 5 files
1. Click the green `Train` model button in the top right

## Part 2 - Testing our model
We'll test our new model by trying some pictures that have never been seen by the model.

1. Select `Quick Test` and upload an image
* Either find a willing volunteer to take your picture and upload that
* or navigate to the `TestImages` folder and select one of those provided

## Part 3 - Improving our model
In this section, we'll improve our model using the predictions feature

1. Navigate to the `Predictions` tab
1. You'll see the images that you tested, if you hover over them you'll see the predictions (right or wrong)
1. Go through and tag these images with their correct labels
1. Select `Train`
* Compare the `Precision` and `Recall` between the iterations
