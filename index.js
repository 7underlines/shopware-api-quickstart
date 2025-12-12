import dotenv from 'dotenv';
import { create, Criteria } from 'shopware-admin-api-client';
import fs from 'fs';

async function main() {
  // Load environment variables from .env file
  dotenv.config();

  // Validate environment variables
  if (!process.env.SHOPWARE_API_URL || !process.env.SHOPWARE_API_CLIENT_ID || !process.env.SHOPWARE_API_CLIENT_SECRET) {
    console.warn('Missing required environment variables - using default values for local development.');
  }
  const api_url = process.env.SHOPWARE_API_URL || 'http://localhost';
  const api_client_id = process.env.SHOPWARE_API_CLIENT_ID || 'admin';
  const api_client_secret = process.env.SHOPWARE_API_CLIENT_SECRET || 'shopware';

  // Create the API client
  let api = await create(api_url, api_client_id, api_client_secret);
  await shopware(api)
  console.log('Done.');
}

// Your code to interact with the Shopware API
async function shopware(api) {
  let repository = api.create('product');
  let criteria = new Criteria();
  criteria.limit = 1;
  criteria.addFilter(Criteria.equals('parentId', null));
  // criteria.addFilter(Criteria.range('childCount', { gt: 0 }));
  // criteria.addAssociation('children.cover');
  while (true) {
    const context = api.defaultContext();
    // Optional: enable inheritance
    context.inheritance = true;
    let entities = await repository.search(criteria, context);
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
    if (changeset.length > 0 || deletions.length > 0) {
      console.log(`Changesets: ${changeset.length} / Deletions: ${deletions.length}`);
      // Optional: log changes to a file
      for (const entity of changeset) {
        const change = new Date().toISOString() + ' ' + JSON.stringify(entity.changes) + '\n';
        fs.appendFileSync('changes.log', change);
      }
    }

    // Save all entities at once (bulk update)
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

main()
