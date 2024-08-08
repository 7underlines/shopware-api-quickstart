# Shopware API Quickstart

This repository provides a quickstart template for working with the Shopware 6 Admin API using JavaScript. It's designed to help developers get up and running quickly with the essential setup needed to interact with the Shopware 6 Admin API.

## Getting Started

### Prerequisites

- Node.js and npm installed on your development machine.
- Access to a Shopware 6 instance with API credentials.
- Alternatively, a preconfigured Docker setup with dockware to start a Shopware 6 instance for testing. The credentials for the API are preconfigured in the `.env.example` file.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thomaspeissl/shopware-api-quickstart.git
cd shopware-api-quickstart
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
