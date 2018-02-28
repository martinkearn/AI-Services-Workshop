# Machine Learning for Developers
In this lab you'll learn about building and deploying Machine Learning solutions in Azure Machine Learning Studio - from dataprep to deployment.

## 1 - Here's one I made earlier
First we need to jump into the Cortana Intelligence Gallery and and open a pre-built experiment in Azure ML Studio. This will form the first half of our Machine Learning Studio project: the dataprep.

### 1.1 - Find and duplicate the dataprep experiment
All you need to do is go to https://aka.ms/AIWorkshopML, and click "Open in Studio" (green button to the right hand side of the screen).

You should be taken to the tool at studio.azureml.net and met with a window that says "Copy experiment from Gallery". It will choose the South Central US region by default and create a free workspace for you. 

Though West Europe is a compatible region, this free workspace is fine for today. Just click the "tick" button to accept.

The experiment "MasonFlightMLDemo2018" will then open in the Azure ML workspace. You should see a two columns of bubbles strung together. This is now a duplicate of the experiment you imported from the gallery, and you can edit and save it as your heart desires. It's now yours.

### 1.2 - What's going on here?
The bubbles and arrows in the experiment represent a logical flow of the datasets through several processing steps necessary for preparing the data.

We are prepping two datasets, and so we have two columns.

### 1.3 - The first column
In turn, from top to bottom, here's what each bubble in the first (leftmost) column is doing:

1. The first module is the raw dataset. In this case flight data including departure, delay, and airport information.
2. The second module sets missing data to a custom value, making it easier for us humans to see where data is missing. 
3. The third module selects specific columns from the dataset. This is done by launching the columns selector and setting a logical rule. In this case we begin with all columns, and exclude DepartureDel15, ArrDelay, Cancelled, Year, DayOfWeek, and CRSArrTime.

This excludes columns we don't need in our dataset for the purposes we'll use it for, so you can do all your data processing in the tool.

4. Next we use a "clean missing data" module to remove rows in which there is missing data, so the dataset we use is as complete as possible, which should make our modelling more accurate.
5. The fifth module is "Edit Metadata". Here we are using it to change IDs used to recognize carriers and airports to categorical form, as before they were entered as strings.
6. Next we apply a math operation, to divide a time value by a constant 100. Math operations available range from simple arithmetic to much more complex operations, again all in-tool.
7. Our final module is another math operation which rounds a value to give us the hour of departure given a time. This shows how we can link together simple math operations to do complex processing. 

### 1.4 - The second column
The second column in the dataprep experiment, from top to bottom, does the following:

1. The first module is the raw dataset. In this case weather data including several types of temperature, sky condition, and visibility information.
2. The second module sets missing data to a custom value, making it easier for us humans to see where data is missing.
3. The third module selects specific columns from the dataset. In this case we begin with all columns, and exclude ValueForWindCharacter, WetBulbFarenheit, PressureTendency, PressureChange, StationPressure, DryBulbFarenheit, DewPointFarenheit, and Year. We've identified that these things aren't important to the departure and delay of flights.
4. Next we again use a "clean missing data" module to remove rows in which there is missing data.
5. See below
6. For the fifth and sixth modules apply math operations to divide the time value by 100 and use floor rounding to isolate the hour of the day. This will make it easier to compare timings with the other dataset, per hour.
7. The final module in the second column then removes rows in which duplicates occur in select columns

Note: We can see the results from each stage in the process by right-clicking the dot beneath each bubble, which visualises our dataset after that point in time. We must save and run the experiment before we can do this. ML studio also provides basic stats including mean, median, and mode for each column in your data, including box plot and histogram visualizations. 

### 1.5 - Finishing dataprep and joining our data.
Awesome! Our two datasets are prepped and now we want to insert modules to join them and get rid of redunant columns that slipped through the cracks.

1. Use the search bar above the module list on the left of the screen, searching for "Join Data". When you find the correct module, drag it into your workspace.
2. Starting from the top of this "Join Data" module, click and drag from the left input to the output of "apply math operation" on the left, to connect the two.
3. Click on the "Join Data" module and switch the the join type to "Inner Join". 
4. Launch the column selector for "L" (the flight data), and select Month, Day of Month, Divide(CRSDepTime_$100), and OriginAirportID. Make sure that "Allow duplicates and preserve column order" is ticked.
5. Now do the same for "R" (the weather data), selecting Month, Day, Divide(Time_$100), and AirportID.

Note that we are not "matching on case". Deselect this option.

6. Next, use the search bar again to find the "Select Columns in Dataset" module, dragging this into your workspace. 
7. Click on the module and set a selection rule beginning with all columns, and excluding CRSDepTime,Time,and TimeZone.

### 1.6 - Exporting our prepped dataset

Save and run your experiment, visualising the final output to make sure your dataset looks like mine. 

Then right click that final output again and select "Save as dataset".

Deselect the tick box and then choose a name for your dataset. 

Use the menu to the left of the screen to go to datasets - your result set should appear there. 

## 2 - Modelling time.
Now for the actual ML. Let's create a new experiment that takes advantage of this new dataset to offer predictions.

1. Use the menu on the left to open your experiments
2. Select "New" on the bottom left and open a blank experiment.
3. Open "saved datasets" and drag your result dataset into the workspace.

Note: you can rename your experiment by selecting the title at the top of the workspace. 

### 2.1 - Beginning to build our model

First we need to identify features and labels in our model by using the "Edit metadata" module we saw previously.

1. Use the the searchbar for "Edit metadata", drag it into your workspace and connect it to your dataset.
2. Select the "edit metadata module", selecting the ArrDel15 (arrival delay) column. (Use the right arrow ">" to move this into the selected columns field, then click the tick to confirm). 

We're trying to predict arrival delays, so we want to learn the behaviour of ArrDel15. We want the model to recognize all other column values as "features" in our model: factors that could affect our prediction of the output (arrival delay). 

So now we've selected the arrival delay column we'll tag it as the "Label" of our model by changing the "fields" part of the "edit metadata" module.

3. Drag another "edit metadata" module into the workspace below the first, and use it to label all other columns as features. Beginning with all columns, and excluding all labels.
4. Now we need to split out data 80:20 into training and test data. Search for the "split data module and drag it into your workspace, connecting its input to output of the most recent module. Click on the module and ensure its values are: 

Splitting mode: "Split Rows"
Fraction of rows in the first output dataset: 0.8
Randomized split: checked
Random seed: 0
Stratified split: True

...and then select all labels using the column selector. 

### 2.2 - Building a classification model
Now we're going to build our classifier. 

1. Select the "Two-class Logistic Regression" module from the module menu, and drag it into your workspace, to the left of your "split data" module.

The values within this module should be:

Create trainer mode: Single Parameter
Optimization tolerance: 1E-07
L1 regularization weight: 1
L2 regularization weight: 1
Memory size for L-BFGS: 20
Random number seed: 
Allow unknown categorical levels: checked

Note how this allows you to customize on a low level how the machine learning model is implemented, but you can just use defaults or conventions here depending on your use case. That's all you NEED to know.  

2. Next we want to use 80% of our split dataset to train the model. Drag in a "train model" module, and Connect the leftmost output of the "split data" module to its rightmost input.

Within this "train model" module, select "all labels". We want to train the model to recognize our label.

3. Drag the output of the "two-class logistic regression" module to the leftmost input of the "train model" module.
4. Save and run to ensure the training works. 

So we have another output of our split data module. Now to score the model to get some probability value output for arrival delays.

5. Drag a "Score Model" module into the workspace. Connect the output of your "train model" module to its leftmost input, and the rightmost output of the "split data" module to its rightmost input. 
6. Ensure that  within "Score Model", "append score columns to output is checked", so that when you save and run, you can see the data and the result side-by-side.
7. Save and run the experiment, making sure we get green checks on all modules. 

You've just built your first machine learning model in ML Studio!    

## 3 - Evaluating the model
Now to evaluate the results.

1. Drag an "Evaluate model" module into your workspace, connecting the output of "score model" to its input. 
2. Save and run, and visualize the output of the evaluation.

Note the visualisation and matrix of scores. 

Our most important results for classification are:

Accuracy = True positives + true negatives<br>
Recall = True positives/(true positives + false negatives)<br>
Precision = True positives/(true positives + false positives)<br>
F1 Score = .2 * (precision*recall)/(precision+recall)<br>

But don't worry about the maths, the tool calculates all these for you, weighted between 0 and 1 (1 of course being perfect).

This model isn't too bad for a first try!

Note: with multiple evaluaton results we can actually compare them side-by-side. There are lots of options for optimization and tweaks you can make to your model, that may be useful in further iterations, before you deploy. This is done by just dragging more modules into the workspace, hooking them up, and setting your parameters as you'd like them, or running with the defaults. 

## 4 - Deploying the model as a web service.

Ok! So we've built a machine learning model, now we want to make use of it in our application.

1. Go to the toolbar at the bottom of the screen and hover over "Set up Web Service". Note that we can both train our models and use them for prediction, all through a standard API interface.
2. Select "Predictive Web Service (Recommmended)". The studio will create a new tab for this predictive service, so you can continue playing with your underlying model. You'll also notice that "web service input" and "web service output" modules have been added. 

We'll need to reconfigure the logic of the predictive web service a little before it will work for us.

3. First connect the "web service input module" output to the rightmost input of "score model". 
4. Add a "select columns in dataset" module between score model, and the rest of the experiment, selecting all columns excluding ArrDel15. This is necessary because by default, data flowing through our feed may contain arrival delay data, which is supposed to be our label, not a feature. 
5. We can then modify the output returned from the web service by placing another "select columns in dataset" module below the "score model" module. Though in the original scoring we appended our results to compare them to the raw data, we only want the service to return scored labels and probabilities. 
6. Therefore, within your new "select columns in dataset module", we should select the columns "Scored Probabilities" and "Scored Labels".
7.  Ensure your "web service output" module's input is attached to the output of this "select columns in dataset" module.    
8. Save and run to make sure everything works.

A new module may be added as a placeholder for a separate experiment which retrains the model. This shows how we can implement continuous learning for our web service. 

### 4.1 Time to publish!
Now we've build our web service, it's time to publish and make use of it. Click the "deploy web service" button in the bottom toolbar. 

Once published, we can make use of it to get our scored labels and probabilities using a simple REST API call, something we should all be familiar with.

### 4.2 Testing the service 
Let's make sure the things working.

After the service is published, we should be redirected to a web services page showing those that we've published. Here we can find details such as the necessary API key, endpoint information - everything we need to make use of the service.

1. Go to the configuration tab and make sure "enable sample data" is set to "yes".
2. Return to the dashboard for your web service, and click "Test". This will give us a simple dialog to test the web service using mock test data (no need to build an app to make sure it's working for you). Enter your test values as follows (or use custom test data if you're comfortable with requirements for getting realistic predicitons):

DepDelay = 33<br>
Divide(CRSDEPTIME_$100) = 8<br>
Month = 4<br>
Altimeter = 29.6<br>
Carrier = DL<br>
SeaLevelPressure = 30<br>
DewPointCelsius = 1.7<br>

3. You should notice that the output is a JSON response containing predicted scores we could easily parse and use in our application code. 

So what we have? Just an API, but it's also real, data-informed machine learning which predicts something given a custom set of conditions. And you built it!


