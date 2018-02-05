# Knowledge Services Lab
In this lab you'll learn about the Q&A Maker service and the Cortana Intelligence Recommendations solution

## Part 1 - QnA Maker with Innocent Drinks
In this section you'll setup a simple Q&A Maker service base don the FAQs found on the Innocent drinks website. You'll then tune it slightly by adding your own data to the knowledge base

### Part 1.1 - Create QnA Maker Service
1. Go to https://www.innocentdrinks.co.uk/us/contact-us/faqs#faq-content and have a look at the FAQs
1. Go to https://qnamaker.ai
1. Sign In
1. Click 'Create new service'
    1. Name: InnocentDrinks
    1. URL: https://www.innocentdrinks.co.uk/us/contact-us/faqs#faq-content 
    1. Create
1. Test
1. Ask "how do you make your juices"

Note that the test bot gives the answer for the question "How do you make your orange juice?" which is not exactly what was asked

### Part 1.2 - Add to knowledge base
1. Ask "What do you make" and note that an inappropriate answer is given
1. Go to 'Knowledge base'
1. CLick 'Add new QnA pair'
1. Add "What do you make" for the question
1. Add "We make smoothies, juices, bubbly drinks, coconut water and kids drinks" for the answer 
1. Click 'save and retain'
1. Test
1. Ask "what products do you make" and note that your new answer is given

Note that you can also choose alternative answers and add additional phrasings to make the knowledge base broader.

### Part 1.3 - Publish
1. Click Publish
1. Note that you have an endpoint and `Ocp-Apim-Subscription-Key` which can be used to make simple API calls

## Part 2 - Books Recommendations
In this section you'll deploy the Cortana Intelligence Suite Recommendations Solution to your Azure subscription and train it to provide book recommendations.

### Part 1.1 - Deploy the Recommendations Solution
1. Go to https://gallery.cortanaintelligence.com/Tutorial/Recommendations-Solution
1. Click 'Deploy'
1. Create a deployment
    1. Deployment name: books
    1. Subscription: (Use whatever subscription you are using)
    1. Location UK South (or wherever your nearest data center is)
1. Click 'Create'
1. Click 'Next'
1. Choose 'S1' for the App Service Plan and click 'Next'
1. Choose 'Standard_LRS' for storage and click 'Next'
1. Choose 'North Europe' for Application Insights and click 'Next'
1. At the 'Next Steps' page, make sure you take a copy of this information (print to PDF)

### Part 1.2 - Configure your recommendations build
1. Click on the link for 'Recommendations UI' from the 'next steps' page in the previous section
