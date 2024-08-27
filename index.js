import dotenv from 'dotenv';
import { create, Criteria } from 'shopware-admin-api-client';

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
    return;
  }

  // Create the API client
  let api = await create(apiUrl, clientId, clientSecret);
  await shopware(api)
  console.log('Done.');
}

// Your code to interact with the Shopware API
async function shopware(api) {
  let repository = api.create('product');
  let criteria = new Criteria();
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

    // Optional: show statistics if changes are about to be saved
    const { changeset, deletions } = repository.getSyncChangeset(entities);
    if ( changeset.length > 0 || deletions.length > 0 ) {
      console.log(`Changesets: ${changeset.length} / Deletions: ${deletions.length}`);
    }

    // Save all changes at once (bulk update)
    await repository.sync(entities, api.defaultContext());
    criteria.page++;
    
    // Optional: break after the first page
    break;
  }
}

// Your code to handle the entity
async function handleEntity(entity) {
  console.log(entity.name);
  // You can modify the entity here
  // entity.name += '3';
  // entity.stock = 1;
}

// Call the main function
main().catch((error) => {
  console.error('Error in main function:', error);
});