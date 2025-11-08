// This is a mock API endpoint for Farcaster Frame functionality
// In a real implementation, this would be deployed as a serverless function

interface FrameData {
  address: string;
  transactionData: {
    hash: string;
    date: string;
    daysSince: number;
  } | null;
}

// Mock data storage (in a real app, this would be a database)
const frameDataStore: Record<string, FrameData> = {};

export function generateFrame(address: string) {
  // Generate or retrieve frame data for the given address
  if (!frameDataStore[address]) {
    // Generate mock data
    const seed = address.substring(2, 10);
    const seedNum = parseInt(seed, 16);
    
    const daysAgo = (seedNum % 365) + 1;
    const timestamp = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
    const hash = `0x${'0'.repeat(64 - seed.length)}${seed}`;
    const date = new Date(timestamp).toLocaleDateString();
    const daysSince = daysAgo;
    
    frameDataStore[address] = {
      address,
      transactionData: {
        hash,
        date,
        daysSince
      }
    };
  }
  
  return frameDataStore[address];
}

export function generateFrameMetadata(address: string) {
  const frameData = generateFrame(address);
  
  if (!frameData.transactionData) {
    // Initial frame - ask for address
    return `
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://base.org/images/logo.png" />
      <meta property="fc:frame:button:1" content="Enter Address" action="input" />
      <meta property="fc:frame:input:text" content="Enter your Ethereum address" />
    `;
  } else {
    // Result frame - show transaction data
    return `
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://base.org/images/logo.png" />
      <meta property="fc:frame:button:1" content="Share" action="post" />
      <meta property="og:title" content="Base First Transaction Tracker" />
      <meta property="og:description" content="I've been building on Base since ${frameData.transactionData.date}! 🔵 It's been ${frameData.transactionData.daysSince} days since my first Base transaction!" />
    `;
  }
}