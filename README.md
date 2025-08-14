# Shopware API Quickstart

**Note:** The plain admin/admin login from the .env.example seems to no longer work with Shopware 6.7+. You need to use Shopware API credentials generated in the Shopware backend (Settings->System->Integrations).

This repository provides a quickstart template specifically designed for working with the Shopware 6 Admin API using JavaScript. It is intended exclusively for developers who need to interact with the Shopware 6 Admin API. **Please note**: This template is not suitable for use with the Shopware Storefront API.

If your goal is to create a frontend website and use Shopware 6 solely as a backend, you should utilize the official Shopware API client instead: [@shopware/api-client](https://www.npmjs.com/package/@shopware/api-client).

This template uses this Shopware 6 Admin API client: [Shopware 6 Admin API Client](https://github.com/7underlines/js-shopware-admin-api-client).

## Differences Between This Client and the Official Shopware API Client

### Purpose:

- **This Client**: Designed for the Shopware 6 Admin API, making backend tasks like editing products and bulk updates straightforward. It's ideal for developers managing and automating backend operations.

- **Official Client**: Focused on the Shopware Storefront API, optimized for frontend development. Best for retrieving data to build and manage e-commerce websites.

### Use Case:

- **This Client**: Ideal for developers who need to automate backend tasks, perform bulk updates, or directly manipulate the data within the Shopware Admin system. It's a great tool for those looking to script complex operations or manage large datasets in Shopware's backend.

- **Official Client**: Best suited for developers building frontend applications that rely on data from Shopware. It helps in fetching the necessary data to populate a storefront, handle customer interactions, and manage orders and checkout processes.

## Getting Started

### Prerequisites

- Node.js and npm installed on your development machine.
- Access to a Shopware 6 instance with API credentials.
- Alternatively, a preconfigured Docker setup with dockware to start a Shopware 6 instance for testing. The credentials for the API are preconfigured in the `.env.example` file.

### Using This Template

On GitHub, click on "Use this template" to create a new repository based on this template.  
Alternatively, you can use this link: [Use this template](https://github.com/new?template_name=shopware-api-quickstart&template_owner=7underlines)

After creating your repository, follow these steps to set up the project:

1. Clone your repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Install the dependencies:

```bash
npm install
```

3. Copy the example environment file and configure your Shopware 6 instance details:

```bash
cp .env.example .env
```

Then, open the .env file and replace the placeholder values with your actual Shopware API credentials:

```bash
SHOPWARE_API_URL=https://your-shopware-instance.com
SHOPWARE_API_CLIENT_ID=your-client-id
SHOPWARE_API_CLIENT_SECRET=your-client-secret
```

**Important Notes:**

- **Client ID and Secret:** You can use your Shopware API Client ID and Secret as usual.

- **Username and Password:** Alternatively, you can use your Shopware admin username as `SHOPWARE_API_CLIENT_ID` and your password as `SHOPWARE_API_CLIENT_SECRET` for authentication.

- **Generating API Credentials:** You can generate the Shopware Admin API credentials in your Shopware backend under **Settings > System > Integrations**. These credentials can also be used for authentication.

Make sure to keep your `.env` file secure and do not share your credentials.

## Usage

Run the example script to see the API in action:

```bash
node index.js
```

### Docker

If you need a Shopware 6 instance to test the API and have Docker installed, you can start a Shopware 6 instance using the following command:

```bash
docker-compose up -d
# or if you have a newer Docker version
docker compose up -d
```

The Docker setup uses dockware and is preconfigured. The API credentials are already set up in the .env.example file, so you can start testing immediately.

## Customization

Feel free to modify the example code and add your own logic to interact with the Shopware 6 Admin API as needed.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. However, as this is a template repository, users are free to replace this license with one of their choice. For more information about the MIT License, please refer to the [MIT License](https://opensource.org/licenses/MIT).
