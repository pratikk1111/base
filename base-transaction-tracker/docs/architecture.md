# Base First Transaction Tracker Architecture

```mermaid
graph TB
    A[User] --> B[React Frontend]
    B --> C[Base Service]
    C --> D[Base Network RPC]
    B --> E[Farcaster Frame]
    E --> F[Farcaster Network]
    
    style A fill:#00cfff
    style B fill:#0052ff,color:#fff
    style C fill:#0052ff,color:#fff
    style D fill:#0052ff,color:#fff
    style E fill:#8a63d2,color:#fff
    style F fill:#8a63d2,color:#fff
```

## Components

1. **React Frontend**: User interface for entering Ethereum addresses and viewing results
2. **Base Service**: Handles communication with Base network RPC
3. **Base Network RPC**: Base mainnet node for fetching transaction data
4. **Farcaster Frame**: Metadata for sharing on Farcaster network

## Data Flow

1. User enters Ethereum address
2. Frontend validates address and sends to Base Service
3. Base Service queries Base Network RPC for transaction history
4. First transaction data is returned and formatted
5. Results are displayed to user with celebration effects
6. User can share results as a Farcaster Frame