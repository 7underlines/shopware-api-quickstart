import dotenv from 'dotenv';
import { create, Criteria } from 'shopware-admin-api-client';
import fs from 'fs';

async function main() {
  dotenv.config();
  let api = await create(process.env.SHOPWARE_API_URL, process.env.SHOPWARE_API_CLIENT_ID, process.env.SHOPWARE_API_CLIENT_SECRET);
  await shopware(api)
}

async function shopware(api) {
  let repository = api.create('product');
  let criteria = new Criteria();
  criteria.limit = 1;
  criteria.addFilter(Criteria.equals('parentId', null));
  // criteria.addFilter(Criteria.range('childCount', { gt: 0 }));
  // criteria.addAssociation('children.cover');
  while (true) {
    const context = api.defaultContext();
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
    criteria.page++;
    break; // Optional: break after the first page
  }
}

async function handleEntity(entity) {
  console.log(entity.name);
}

main()
