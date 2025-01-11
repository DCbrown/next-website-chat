# Chat with your Website

## Getting Started

First, create a new file named `.env.local`. key, [Clerk](https://clerk.com/docs/upgrade-guides/api-keys) key, the,[scrapingant](https://app.scrapingant.com/webscrapingapi)  and the [Vapi assitant](https://dashboard.vapi.ai/org/api-keys) there.

`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NODE_ENV=development
SCRAPINGANT_API_KEY=""
NEXT_PUBLIC_VAPI_TOKEN=""
NEXT_PUBLIC_VAPI_ASSISTANT_ID=""
`  


The first time you are running this project, you will need to install the dependencies. Run this command in your terminal:

```bash
yarn
```

To start the app, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
