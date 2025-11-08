# Base First Transaction Tracker

A Farcaster Mini App that shows users when they made their first transaction on the Base network.

## Features

- 🔵 Track your first transaction on Base network
- 🎉 Celebratory visualization of your Base genesis moment
- 📤 Share your milestone directly to Farcaster
- 📱 Mobile-responsive design
- 🎨 Beautiful UI with Base branding colors

## How to Use

1. Enter your Ethereum address
2. View your first Base transaction details
3. Share your "Base Genesis Moment" to Farcaster

## Setting Up Basescan API Key

To fetch real transaction data, you need to set up a Basescan API key:

1. Go to [basescan.org](https://basescan.org/register) and register for a free account
2. Get your API key from the dashboard
3. Replace `YOUR_BASESCAN_API_KEY` in `src/services/baseService.ts` with your actual API key

## Technical Implementation

This app uses:
- React with TypeScript
- Ethers.js for Base network interactions
- Basescan API for real transaction data
- Farcaster Mini Apps specification
- Vite for development and building

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Farcaster Mini App

This app is designed as a Farcaster Mini App that can be shared directly on Farcaster. The Mini App metadata is included in the HTML head section and the manifest is available at /.well-known/farcaster.json.

## Note

The current implementation uses the Basescan API to fetch real transaction data with fallback to simulation. Make sure to set up your API key for full functionality.