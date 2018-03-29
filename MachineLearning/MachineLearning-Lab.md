# Machine Learning Lab
This lab will create a very simple Azure ML experiment based on car data.

The lab will use Linear Regression to predict the price of a car based on its features (brand, door, bhp etc).

The lab is split into two parts. The first deals with training the machine learning experiment, the second deals with publishing it as a predictive experiment and calling teh API endpoint.

## 1 - Create a Training Experiment
In this part, we'll create a training experiment in Machine Learning studio.

### 1.1 - Create an experiment and load data
In this section, we'll create a new blank experiment and upload our data.

1. Sign into the Azure Machine learning studio using this short link: http://aiday.info/MLStudio
1. Datasets > New > From Local File >  `Car prices.csv`
1. Experiments > New > Blank experiment
1. Save the experiment as `Car Price Prediction` using the bottom command bar

### 1.2 - Add data set
In this section, we'll add the data as the starting point in our experiment. 

The ML Studio uses a drag and drop canvas where you drag modules from the left side navigation and drop them onto the canvas. You then 'stitch' modules together by dragging a line between the input/output ports on the modules. The ports are the small circles at the top (input) and bottom (output) of the modules.

1. Drag Saved Datasets > My DataSets > `Car prices.csv` to the canvas
1. Visualize the dataset. Do this by right-clicking the output port > Visualise

### 1.3 - Clean data - remove rows
It is important that machine learning is performed on clean, uniformed, 'prepared' data.

The `Car prices.csv` data has some missing values so it is not ready for machine learning yet. 

In this section, we'll use the 'Clean missing data' module to to remove any rows that have any missing data. The output of this will be a clean, prepared data set that is ready for machine learning.

1. Drag the Transforms > `Clean missing data` module (or just search for it)
1. Connect the output port of `Car prices.csv` to the input of `Clean missing data`
1. Click on `Clean missing data` and use the right side panel to set the Cleaning mode = "Remove entire row"
1. Run the experiment using bottom command bar (the green arrow) and observe green ticks. This indicates that everything is working as it should be
1. Right-click > Visualise the output port of `Clean missing data`and note that the rows with missing data have been removed.

### 1.4 - Split data
Before we can apply machine learning algorithms, we must reserve some data to test what the algorithms learnt (i.e. compare the predicted car price to the actual one).

We'll use the Split Data module to split the data into 75% for training and 25% for testing

1. Drag the Data Transformation > Sample & Split > `Split Data` module (or search for it)
1. Connect to output port of `Clean Missing Data` to the input port of `Split Data`
1. Click on 'Split Data' and use the right side panel to set `Fraction of rows in the first output dataset` to 0.75
1. Run the experiment and observe the green ticks.

The left output port of the `Split Data` module now represents a random 75% of the data and the right output port represents a random 25%.

### 1.5 - Add Linear Regression
The linear regression algorithm is the machine learning algorithm that is best suited for this task of predicting a single data point.

In this section, we'll add the Linear Regression algorithm to the experiment.

1. Drag the Machine Learning > Initialize Model > Regression > `Linear Regression` module (or just search for it)
1. Place next to the `Split data` module

### 1.6 - Train the model on Price
We want to train on the price field. This means we want to use Linear Regression to learn what factors in the data affect and impact the price and then use those factors to predict the price for each car. The predicted price is called a 'Scored Label'.

1. Drag the Machine Learning > Train > `Train Model` module (or search for it)
1. Connect the left input port of `Train Model` to the output port for `Linear regression`
1. Connect the right input port of `Train Model` to the left output port of `Split Data`
1. Click on `Train Model` and click the `Launch column selector` in the right side panel
1. Add `price` as a selected column
1. Run the experiment and observe the green ticks

At this point we can see that we're using the Linear Regression algorithm to train on price using 75% of the data set.

### 1.7 - Score the model
We now need to score the model by comparing the model we've trained against the remaining 25% of data to see how accurate the price prediction is.

1. Drag the Machine Learning > Score > `Score Model` module (or search for it)
1. Connect the left input port of `Score Model` to the output port of `Train Model`
1. Connect the right input port of `Score Model` to right output port of `Split data`
1. Run the experiment and observe the green ticks
1. Right-click > Visualise the output port of `Score Model`
1. Compare the `price` to `scored label`. This shows that the predicted price (i.e. scored label) is in the right 'ball park' compared to the actual price.

We now have a functional training experiment.

## Part 2 - Create and publish a predictive experiment
In this section, we'll convert the training experiment to a predictive experiment and test the the API with some new data.

### 2.1 - Convert to Predictive Experiment
So far the experiment has just been a 'training experiment'. We now need to convert it to a model that can be used to score new data.

1. Run the experiment and observe the green ticks
1. Using the bottom command bar open the `Setup Web Service` menu and choose `Predictive Web Service`
1. Run the new predictive experiment (this takes approx 30 seconds)
1. Using the bottom command bar, `Deploy Web Service`. The experiment will now be deployed and you'll see a screen containing the endpoint, key and some test interfaces when it is completed

### 2.2 - Test the Web Service
We'll now use our deployed predictive experiment to test some new car data and get a new predicted price.

1. Using the left navigation panel, go to Web Services > `Car Price Prediction [Predictive Exp]`
1. Click `Test (preview)`. This is in the Test column for the request/response endpoint - not the big blue button, the small link next to it
1. Complete the `Input1` form with the following data
    * make = `audi`
    * fuel = `diesel`
    * doors =  `four`
    * body = `hatchback`
    * drive = `fwd`
    * weight = `1900`
    * engine-size = `150`
    * bhp = `150`
    * mpg = `55`
    * price = `23000`
1. Click `Test Request-Response`
1. Observe `scored labels` (the predicted price) is lower than the actual price of £23,000. We know the model is right because it is an Audi and therefore it is overpriced :)
