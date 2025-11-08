# Base First Transaction Tracker Examples

## How to Use

1. Visit the app at http://localhost:5173
2. Enter a valid Ethereum address in the input field
3. Click "Track My First Tx"
4. View your Base genesis moment information
5. Click "Share My Base Journey" to copy the share text to your clipboard

## Sample Addresses

You can test the app with any valid Ethereum address. Here are some examples:

- `0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326`
- `0x388C818CA8B9251b393131C08a736A67ccB19297`
- `0x4200000000000000000000000000000000000006`

Note: The current implementation simulates transaction data for demonstration purposes. In a production environment, you would integrate with a blockchain explorer API (like Basescan) or use a more robust solution to fetch actual transaction data.

## Farcaster Sharing

When you click "Share My Base Journey", the app will copy a formatted message to your clipboard that you can paste into Farcaster:

```
I've been building on Base since [DATE]! 🔵

It's been [X] days since my first Base transaction!

Check your Base genesis moment: [URL]
```

## Error Handling

The app includes error handling for:

- Invalid Ethereum addresses
- Addresses with no Base transactions
- Network connectivity issues
- API errors

If an error occurs, a descriptive message will be displayed to help you resolve the issue.