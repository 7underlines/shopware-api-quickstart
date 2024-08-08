import dotenv from 'dotenv';
import {createFromPasswordAndLogin, createFromIntegration, Criteria} from '@thomaspeissl/shopware-admin-api-client';

// Main async function
async function main() {
    // Load environment variables from .env file
    dotenv.config();

    // Access environment variables
    const apiUrl = process.env.SHOPWARE_API_URL;
    const clientId = process.env.SHOPWARE_API_CLIENT_ID;
    const clientSecret = process.env.SHOPWARE_API_CLIENT_SECRET;

    // Create the API client
    let api = await createFromPasswordAndLogin(apiUrl, clientId, clientSecret);
    // let api = await createFromIntegration(apiUrl, clientId, clientSecret);
    
    // Your code to interact with the Shopware API
    let repository = api.create('product');
    let criteria = new Criteria();
    criteria.limit = 1;
    criteria.addFilter(Criteria.equals('parentId', null));

    let products = await repository.search(criteria, api.defaultContext());

    for (const product of products) {
        console.log(product.name);
        // product.name = 'Node Test';
        // console.log(product.name);
        // await repository.save(product, api.defaultContext()); // use this if you want to save the changes to this product directly (single update)
    }
    // await repository.sync(products, api.defaultContext()); // or if you update multiple products you can use this to save all changes at once (bulk update)
}

// Call the main function
main().catch((error) => {
  console.error('Error in main function:', error);
});