import React, { useState, useEffect } from 'react';
import { baseService } from '../services/baseService';
import type { Transaction } from '../services/baseService';
import Confetti from '../utils/confetti';
import { sdk } from '@farcaster/miniapp-sdk';
import { useAccount } from 'wagmi';

interface TransactionData {
  hash: string;
  timestamp: number;
  daysSince: number;
  date: string;
  blockNumber: number;
}

const BaseTransactionTracker: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Get connected wallet data from Wagmi
  const { address: connectedAddress, isConnected } = useAccount();

  // Call the ready function when the component mounts
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        await sdk.actions.ready();
        console.log('Mini App SDK ready');
      } catch (err) {
        console.error('Failed to initialize Mini App SDK:', err);
      }
    };
    
    initializeSDK();
  }, []);
  
  // Auto-populate address when wallet is connected
  useEffect(() => {
    if (isConnected && connectedAddress) {
      setAddress(connectedAddress);
    }
  }, [isConnected, connectedAddress]);

  const validateAddress = (addr: string): boolean => {
    try {
      // Check if it's a valid Ethereum address
      return /^0x[a-fA-F0-9]{40}$/.test(addr);
    } catch (e) {
      return false;
    }
  };

  const fetchFirstTransaction = async (userAddress: string) => {
    if (!validateAddress(userAddress)) {
      throw new Error('Invalid Ethereum address format');
    }

    setLoading(true);
    setError(null);
    setTransactionData(null);

    try {
      // Get first transaction from Base service
      const tx: Transaction | null = await baseService.getFirstTransaction(userAddress);
      
      if (!tx) {
        throw new Error('No transactions found for this address on Base network');
      }
      
      const date = baseService.formatDate(tx.timestamp);
      const daysSince = baseService.calculateDaysSince(tx.timestamp);
      
      return {
        hash: tx.hash,
        timestamp: tx.timestamp,
        daysSince,
        date,
        blockNumber: tx.blockNumber
      };
    } catch (err: any) {
      console.error('Error fetching transaction data:', err);
      throw new Error(err.message || 'Failed to fetch transaction data. Please check the address and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter an Ethereum address');
      return;
    }
    
    try {
      const data = await fetchFirstTransaction(address.trim());
      setTransactionData(data);
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching transaction data');
    }
  };

  const handleShare = () => {
    if (!transactionData) return;
    
    const shareText = `I've been building on Base since ${transactionData.date}! 🔵\n\nIt's been ${transactionData.daysSince} days since my first Base transaction!\n\nCheck your Base genesis moment:`;
    
    // Copy to clipboard and show confirmation
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert(`Copied to clipboard! You can now share this on Farcaster:\n\n${shareText}`);
      })
      .catch(() => {
        // Fallback if clipboard fails
        prompt('Copy this text to share on Farcaster:', shareText);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Base First Transaction Tracker</h1>
        <p>Discover when you made your first move on the Base network</p>
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <div className="input-group">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Ethereum address (0x...)"
            className="input-field"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Searching...' : 'Track My First Tx'}
          </button>
        </div>
      </form>
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for your first Base transaction...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      
      {transactionData && (
        <div className="result-container">
          <h2 className="result-title">🎉 Your Base Genesis Moment!</h2>
          
          <div className="transaction-info">
            <div className="info-item">
              <span className="info-label">First Transaction Date:</span> {transactionData.date}
            </div>
            <div className="info-item">
              <span className="info-label">Transaction Hash:</span> {transactionData.hash.substring(0, 10)}...{transactionData.hash.substring(transactionData.hash.length - 8)}
            </div>
            <div className="info-item">
              <span className="info-label">Block Number:</span> {transactionData.blockNumber.toLocaleString()}
            </div>
            <div className="info-item">
              <span className="info-label">Days Since First Tx:</span> {transactionData.daysSince} days
            </div>
            <div className="info-item">
              <span className="info-label">Milestone:</span> You've been building on Base for {Math.floor(transactionData.daysSince / 30)} months!
            </div>
          </div>
          
          <button onClick={handleShare} className="share-button">
            Share My Base Journey 🚀
          </button>
        </div>
      )}
      
      {showConfetti && <Confetti />}
    </div>
  );
};

export default BaseTransactionTracker;