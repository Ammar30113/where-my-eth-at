# Where My ETH At?

A minimal Ethereum Mainnet wallet balance checker.

## Tech Stack

- Next.js App Router
- TypeScript
- ethers.js
- Alchemy Ethereum Mainnet RPC

## Run Locally

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you add or change `.env.local` while the dev server is already running,
restart the server so Next.js picks up the new value.

## Alchemy API Key

1. Create an account at [Alchemy](https://www.alchemy.com/).
2. Create a new Ethereum Mainnet app.
3. Copy the HTTPS RPC URL.
4. Paste it into `.env.local` as `NEXT_PUBLIC_ALCHEMY_URL`.

Do not commit `.env.local`. It is ignored by git because it contains your API
key.

## Example Wallet

Use this address for a quick test:

```text
0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```
