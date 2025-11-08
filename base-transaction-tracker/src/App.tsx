import './App.css';
import { MiniAppProvider } from '@neynar/react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import BaseTransactionTracker from './components/BaseTransactionTracker';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Configure Wagmi with Farcaster connector
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    farcasterMiniApp()
  ],
});

function App() {
  return (
    <MiniAppProvider analyticsEnabled={true}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <div className="App">
            <BaseTransactionTracker />
          </div>
        </WagmiConfig>
      </QueryClientProvider>
    </MiniAppProvider>
  );
}

export default App;