import dotenv from 'dotenv';
import { createFromPasswordAndLogin, createFromIntegration, Criteria } from '@thomaspeissl/shopware-admin-api-client';

// Main async function
async function main() {
  // Load environment variables from .env file
  dotenv.config();

  // Access environment variables
  const apiUrl = process.env.SHOPWARE_API_URL;
  const clientId = process.env.SHOPWARE_API_CLIENT_ID;
  const clientSecret = process.env.SHOPWARE_API_CLIENT_SECRET;

  // Validate environment variables
  if (!apiUrl || !clientId || !clientSecret) {
    console.error('Missing required environment variables.');
    process.exit(1);
  }

  // Create the API client
  let api = await createFromPasswordAndLogin(apiUrl, clientId, clientSecret);
  // let api = await createFromIntegration(apiUrl, clientId, clientSecret);

  shopware(api)
}

// Your code to interact with the Shopware API
async function shopware(api) {
  let repository = api.create('product');
  let criteria = new Criteria();
  // keep the limit below 200
  criteria.limit = 1;
  criteria.addFilter(Criteria.equals('parentId', null));
  // criteria.addFilter(Criteria.range('childCount', { gt: 1 }));
  // criteria.addAssociation('children.cover');
  while (true) {
    let entities = await repository.search(criteria, api.defaultContext());
    if (criteria.page < 2) {
      console.log(`Entities total: ${entities.total} (limit: ${criteria.limit})`);
    }
    if (entities.length < 1) {
      break;
    }
    console.log(`Page: ${criteria.page} / ${Math.ceil(entities.total / criteria.limit)}`);
    for (const entity of entities) {
      await handleEntity(entity)
    }
    // save all changes at once (bulk update)
    await repository.sync(entities, api.defaultContext());
    criteria.page++;

    // remove the break to process all pages
    break;
  }
}

// Your code to handle the entity
async function handleEntity(entity) {
  console.log(entity.name);
  // entity.name = 'JS Test';
}

// Call the main function
main().catch((error) => {
  console.error('Error in main function:', error);
});