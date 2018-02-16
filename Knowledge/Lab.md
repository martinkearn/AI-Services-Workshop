# Knowledge Services Lab
In this lab you'll learn about the Q&A Maker service and the Cortana Intelligence Recommendations solution

## 1 - QnA Maker with Innocent Drinks
In this section you'll setup a simple Q&A Maker service base don the FAQs found on the Innocent drinks website. You'll then tune it slightly by adding your own data to the knowledge base

### 1.1 - Create QnA Maker Service
In this section we'll configure a new QnA Maker service using the Innocent drinks FAQ pages.
1. Go to https://www.innocentdrinks.co.uk/us/contact-us/faqs#faq-content (or search "Innocent Drink FAQ") and have a look at the FAQs
1. Go to https://qnamaker.ai
1. Sign In
1. Click 'Create new service'
    1. Name: InnocentDrinks
    1. URL: https://www.innocentdrinks.co.uk/us/contact-us/faqs#faq-content 
    1. Create
1. Test
1. Ask "how do you make your juices"

Note that the test bot gives the answer for the question "How do you make your orange juice?" which is not exactly what was asked

### 1.2 - Add to knowledge base
In this section we'll add extra information to the knowledge base which is missing from the FAQ pages
1. Ask "What do you make" and note that an inappropriate answer is given
1. Go to 'Knowledge base'
1. CLick 'Add new QnA pair'
1. Add "What do you make" for the question
1. Add "We make smoothies, juices, bubbly drinks, coconut water and kids drinks" for the answer 
1. Click 'save and retain'
1. Test
1. Ask "what products do you make" and note that your new answer is given

Note that you can also choose alternative answers and add additional phrasings to make the knowledge base broader.

### 1.3 - Publish
In this section, we'll publish the QnA Maker service so we can see the API end point and key.
1. Click Publish
1. Note that you have an endpoint and `Ocp-Apim-Subscription-Key` which can be used to make simple API calls

## 2 - Books Recommendations
In this section you'll deploy the Cortana Intelligence Suite Recommendations Solution to your Azure subscription and train it to provide book recommendations.

### 2.1 - Deploy the Recommendations Solution
Unlike Cognitive Services, Cortana Intelligence Suite Solution will deploy several components to your own Azure subscription. This gives you a greater degree of control over how these components are used and how the overall solution is stitched together. In this section, we'll deploy the Recommendations solution to your Azure subscription.

1. Go to https://aka.ms/recotemplate
1. Create a deployment
    1. Deployment name: books
    1. Subscription: (Use whatever subscription you are using)
    1. Location UK South (or wherever your nearest data center is)
1. Click 'Create'
1. Click 'Next'
1. Choose 'B3' for the App Service Plan and click 'Next'. Note this is a relatively high tier because it will speed up training time later in the lab.
1. Choose 'Standard_LRS' for storage and click 'Next'
1. Choose 'North Europe' for Application Insights and click 'Next'
1. At the 'Next Steps' page, make sure you take a copy of this information (print to PDF)

Detailed deployment instructions can be also found here: https://github.com/Microsoft/Product-Recommendations/blob/master/doc/deployment-instructions.md

### 2.2 - Upload data files to storage
In this section we'll upload catalog and usage files which are used to train the recommendations solution
1. Go to http://portal.azure.com
1. Go to 'Storage accounts' and click on the account where the first name and resource group matches the name you gave the solution deployment in part 2.1
1. Click on 'blobs'
1. Click on 'models'
1. Upload both `books_catalog_large.txt` and `books_usage_large_WithTimestamps.txt` from in the same location as this `Lab.md` file
1. Click `books_catalog_large.txt` and make a note of the `URL`. It will be something like 'https://booksqakksmxlyfm22st.blob.core.windows.net/models/books_catalog_large.txt'
1. Click `books_usage_large_WithTimestamps.txt` and make a note of the `URL`. It will be something like 'https://booksqakksmxlyfm22st.blob.core.windows.net/models/books_usage_large_WithTimestamps.txt'

### 2.3 - Configure your Recommendations build
In this section we'll configure a build. This is where the recommendations solution uses machine learning to make work out the recommendations for each catalog item based on both catalog and usage data.
1. Click on the link for 'Recommendations UI' from the 'next steps' page in the previous section
1. Enter the 'Admin API key' from the previous step and click 'Login'
1. Click 'Train new model' and enter the following details
    1. Blob Container Name: 'models'
    1. Usage Folder/File Relative Path: 'books_usage_large_WithTimestamps.txt'
    1. Catalog File Relative Path: 'books_catalog_large.txt'
    1. Enable Cold Item Placement: 'True'
    1. Enable Cold to Cold Recommendations: 'True'
1. Click 'Train'.

The training process can take a while. Your instructor will now show the rest of the lab on a pre-trained model, but steps are provided below for you to follow at a later date.

### 2.4 - Test your Recommendations build
In this section we'll test the build out to see what recommendations are being made for specified catalog items (books).

1. Access the Recommendation UI. The link will be in the information you saved at the end of step 2.1. It will look something like https://booksqakksmxlyfm22ws.azurewebsites.net/ui/
1. Check that the Status is 'Completed'
1. Click 'Score' to test the model
In 'Test Item Recommendations' enter `60234814` which is the ID of a book called 'The Lion the Witch and the Wardrobe'. Notice that 10 results are returned.
1. Search for the first recommended book in your `books_catalog_large.txt` file which should be `345339681` which is 'The Hobbit'; a related fantasy based novel.

### 2.5 Look at the API reference
In this section, we'll explore the API.

1. Access your Swagger site. The link will be in the information you saved at the end of step 2.1. It will look something like https://booksqakksmxlyfm22ws.azurewebsites.net/swagger
1. Enter the 'Admin Key' in the 'API Key' section and click 'Explore'
1. Click 'List Operations' to see tehvarious API operations
1. Click on `/api/models/default/recommend`
1. Set `60234814` as the 'itemId' and click 'Try it out'
1. Observe the JSON that gets returned