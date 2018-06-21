# Knowledge Services Lab
In this lab you'll learn about the Q&A Maker service and the Cortana Intelligence Recommendations solution.

## 1 - QnA Maker with Innocent Drinks
In this section you'll setup a simple Q&A Maker service based on the FAQs found on the Innocent drinks website. You'll then tune it slightly by adding your own data to the knowledge base.

### 1.1 - Create QnA Maker Service
In this section we'll configure a new QnA Maker service using the Innocent drinks FAQ pages.
1. Go to https://www.innocentdrinks.co.uk/us/nutrition/nutrition-faqs (or search "Innocent Drink FAQ" to find an FAQ of your own)
2. Go to http://aiday.info/QNAMaker
3. Sign In
4. Click 'Create new service'
    
    i. Name: InnocentDrinks

    ii. URL: https://www.innocentdrinks.co.uk/us/nutrition/nutrition-faqs (or copy from your browser address bar from step 1)
    
    iii. Create

5. Test
6. Ask a question from or similar to one of those in the original FAQ.

### 1.2 - Add to knowledge base
In this section we'll add extra information to the knowledge base which is missing from the FAQ pages
1. Ask "What products do you make?" and note that an inappropriate answer is given
2. Go to 'Knowledge base'
3. CLick 'Add new QnA pair' (top right)
4. Add "What products do you make?" for the question
5. Add "We make smoothies, juices, bubbly drinks, coconut water and kids drinks" for the answer 
6. Click 'save and retain'
7. Test
8. Ask "What products do you make?" or similar, and note that your new answer is given

Note that you can also choose alternative answers and add additional phrasings to make the knowledge base broader.

## 2 - Books Recommendations
In this section you'll deploy the Cortana Intelligence Suite Recommendations Solution to your Azure subscription and train it to provide book recommendations.

This is a long lab and it is not expected that everyone will get to the end in the tine permitted. If you want to stop at any point and see the final, pre-built solution, please see http://aiday.info/Books using a key of `d3Q0NXdsbm50aWZvdw==`

### 2.1 - Deploy the Recommendations Solution
Unlike Cognitive Services, Cortana Intelligence Suite Solution will deploy several components to your own Azure subscription. This gives you a greater degree of control over how these components are used and how the overall solution is stitched together. In this section, we'll deploy the Recommendations solution to your Azure subscription.

1. Go to http://aiday.info/Recommendations
2. Create a deployment
    
    i. Deployment name: books
    
    ii. Subscription: (Use whatever subscription you are using)
    
    iii. Location UK South (or wherever your nearest data center is)

3. Click 'Create'
4. Click 'Next'
5. Choose 'B3' for the App Service Plan and click 'Next'. Note this is a relatively high tier because it will speed up training time later in the lab.
6. Choose 'Standard_LRS' for storage and click 'Next'
7. Choose 'North Europe' for Application Insights and click 'Next'
8. At the 'Next Steps' page, make sure you take a copy of this information (print to PDF)

Detailed deployment instructions can be also found on the Recommendations Solution GitHub repository here: http://aiday.info/RecommendationsGitHub

### 2.2 - Upload data files to storage
In this section we'll upload catalog and usage files which are used to train the recommendations solution
1. Go to http://aiday.info/AzurePortal
2. Go to 'Storage accounts' and click on the account where the first name and resource group matches the name you gave the solution deployment in part 2.1
3. Click on 'blobs'
4. Click on 'models'
5. Upload both `books_catalog_large.txt` and `books_usage_large_WithTimestamps.txt` from in the same location as this `Lab.md` file
6. Click `books_catalog_large.txt` and make a note of the `URL`. It will be something like 'https://booksqakksmxlyfm22st.blob.core.windows.net/models/books_catalog_large.txt'
7. Click `books_usage_large_WithTimestamps.txt` and make a note of the `URL`. It will be something like 'https://booksqakksmxlyfm22st.blob.core.windows.net/models/books_usage_large_WithTimestamps.txt'

### 2.3 - Configure your Recommendations build
In this section we'll configure a build. This is where the recommendations solution uses machine learning to make work out the recommendations for each catalog item based on both catalog and usage data.
1. Click on the link for 'Recommendations UI' from the 'next steps' page in the previous section
2. Enter the 'Admin API key' from the previous step and click 'Login'
3. Click 'Train new model' and enter the following details
    
    i. Blob Container Name: 'models'
    
    ii. Usage Folder/File Relative Path: 'books_usage_large_WithTimestamps.txt'
    
    iii. Catalog File Relative Path: 'books_catalog_large.txt'
    
    iv. Enable Cold Item Placement: 'True'
    
    v. Enable Cold to Cold Recommendations: 'True'

4. Click 'Train'.

The training process can take a while. Your instructor may now show the rest of the lab on a pre-trained model, but steps are provided below for you to follow at a later date.

If your project is taking too long on your own subscription, you are welcome to use the pre-trained model yourself at http://aiday.info/Books using a key of `d3Q0NXdsbm50aWZvdw==`

### 2.4 - Test your Recommendations build
In this section we'll test the build out to see what recommendations are being made for specified catalog items (books).

1. Access the Recommendation UI. The link will be in the information you saved at the end of step 2.1. It will look something like https://{Some unique reference}.azurewebsites.net/ui/
2. Check that the Status is 'Completed'
3. Click 'Score' to test the model
In 'Test Item Recommendations' enter `60234814` which is the ID of a book called 'The Lion the Witch and the Wardrobe'. Notice that 10 results are returned.
4. Search for the first recommended book in your `books_catalog_large.txt` file which should be `345339681` which is 'The Hobbit'; a related fantasy based novel.

### 2.5 Look at the API reference
In this section, we'll explore the API.

1. Access your Swagger site. The link will be in the information you saved at the end of step 2.1. It will look something like https://{Some unique reference}.azurewebsites.net/swagger
2. Enter the 'Admin Key' in the 'API Key' section and click 'Explore'
3. Click 'List Operations' to see the various API operations
4. Click on `/api/models/default/recommend`
5. Set `60234814` as the 'itemId' and click 'Try it out'
6. Observe the JSON that gets returned
