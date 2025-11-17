'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Bitcoin, 
  Wallet, 
  Shield, 
  Copy, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Eye,
  EyeOff,
  QrCode,
  Send,
  Receive,
  History,
  Settings,
  ChevronDown,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react'

interface WalletData {
  address: string
  balance: number
  currency: string
  connected: boolean
  network: string
  transactions: Transaction[]
}

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: number
  currency: string
  from: string
  to: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
  hash: string
  gas?: number
}

const mockWalletData: WalletData = {
  address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45',
  balance: 12.456,
  currency: 'ETH',
  connected: true,
  network: 'Ethereum Mainnet',
  transactions: [
    {
      id: '1',
      type: 'receive',
      amount: 2.5,
      currency: 'ETH',
      from: '0x1234...5678',
      to: '0x742d...Db45',
      status: 'completed',
      timestamp: '2024-01-15 14:30:00',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      gas: 0.0021
    },
    {
      id: '2',
      type: 'send',
      amount: 1.0,
      currency: 'ETH',
      from: '0x742d...Db45',
      to: '0x8765...4321',
      status: 'completed',
      timestamp: '2024-01-14 10:15:00',
      hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      gas: 0.0018
    },
    {
      id: '3',
      type: 'receive',
      amount: 5.0,
      currency: 'ETH',
      from: '0x9876...5432',
      to: '0x742d...Db45',
      status: 'pending',
      timestamp: '2024-01-16 09:00:00',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      gas: 0.0025
    }
  ]
}

const supportedWallets = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Most popular browser wallet',
    type: 'browser'
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect mobile wallets',
    type: 'mobile'
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Secure and easy to use',
    type: 'browser'
  },
  {
    name: 'Trust Wallet',
    icon: '🛡️',
    description: 'Multi-currency mobile wallet',
    type: 'mobile'
  }
]

const currencies = [
  { symbol: 'ETH', name: 'Ethereum', icon: '💎' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'USDT', name: 'Tether', icon: '💰' }
]

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData>(mockWalletData)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('ETH')
  const [showSendModal, setShowSendModal] = useState(false)
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [sendAddress, setSendAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState('')

  const handleConnectWallet = async (walletName: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletName)
    
    // Simulate wallet connection
    setTimeout(() => {
      setWalletData({
        ...walletData,
        connected: true,
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45'
      })
      setIsConnecting(false)
    }, 2000)
  }

  const handleDisconnect = () => {
    setWalletData({
      ...walletData,
      connected: false,
      balance: 0
    })
  }

  const handleSendTransaction = () => {
    if (!sendAmount || !sendAddress) return
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'send',
      amount: parseFloat(sendAmount),
      currency: selectedCurrency,
      from: walletData.address,
      to: sendAddress,
      status: 'pending',
      timestamp: new Date().toISOString(),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      gas: 0.002
    }

    setWalletData({
      ...walletData,
      balance: walletData.balance - parseFloat(sendAmount),
      transactions: [newTransaction, ...walletData.transactions]
    })

    setShowSendModal(false)
    setSendAmount('')
    setSendAddress('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-500' },
      completed: { label: 'Completed', className: 'bg-green-500' },
      failed: { label: 'Failed', className: 'bg-red-500' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config?.className}>{config?.label}</Badge>
  }

  if (!walletData.connected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
              <p className="text-xl text-gray-600 mb-8">
                Choose your preferred wallet to start using cryptocurrency for property rentals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {supportedWallets.map((wallet) => (
                <Card key={wallet.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{wallet.icon}</div>
                      <div>
                        <CardTitle className="text-xl">{wallet.name}</CardTitle>
                        <CardDescription>{wallet.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => handleConnectWallet(wallet.name)}
                      disabled={isConnecting && selectedWallet === wallet.name}
                    >
                      {isConnecting && selectedWallet === wallet.name ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          {wallet.type === 'browser' ? (
                            <Laptop className="w-4 h-4 mr-2" />
                          ) : (
                            <Smartphone className="w-4 h-4 mr-2" />
                          )}
                          Connect {wallet.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure Connection</h3>
                    <p className="text-sm text-gray-600">
                      Your wallet connection is encrypted and secure
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Privacy Protected</h3>
                    <p className="text-sm text-gray-600">
                      We never store your private keys or passwords
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Multi-Network</h3>
                    <p className="text-sm text-gray-600">
                      Support for multiple blockchain networks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
              <p className="text-gray-600">Manage your cryptocurrency payments</p>
            </div>
            <Button variant="outline" onClick={handleDisconnect}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>

          {/* Wallet Overview */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Wallet Overview
                  </CardTitle>
                  <Badge variant="outline">{walletData.network}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Wallet Address</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(walletData.address)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="font-mono bg-gray-50 p-3 rounded-lg">
                    {formatAddress(walletData.address)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Available Balance</span>
                    <div className="flex items-center gap-2">
                      {currencies.map((currency) => (
                        <Button
                          key={currency.symbol}
                          variant={selectedCurrency === currency.symbol ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCurrency(currency.symbol)}
                        >
                          <span className="mr-1">{currency.icon}</span>
                          {currency.symbol}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">
                    {walletData.balance.toFixed(3)} {walletData.currency}
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ ${(walletData.balance * 2500).toLocaleString()} USD
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowSendModal(true)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowReceiveModal(true)}
                  >
                    <Receive className="w-4 h-4 mr-2" />
                    Receive
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Transactions</span>
                  <span className="font-semibold">{walletData.transactions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {walletData.transactions.filter(t => t.status === 'pending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {walletData.transactions.filter(t => t.status === 'completed').length}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Gas Fees</span>
                  <span className="font-semibold">
                    {walletData.transactions.reduce((sum, t) => sum + (t.gas || 0), 0).toFixed(4)} ETH
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Transaction History
                </CardTitle>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Etherscan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'send' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {transaction.type === 'send' ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium capitalize">
                          {transaction.type} {transaction.currency}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.type === 'send' ? 'To: ' : 'From: '}
                          {formatAddress(transaction.type === 'send' ? transaction.to : transaction.from)}
                        </div>
                        <div className="text-xs text-gray-400">{transaction.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'send' ? '-' : '+'}
                        {transaction.amount} {transaction.currency}
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Send Cryptocurrency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                <Input
                  placeholder="0x..."
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Available Balance</span>
                  <span>{walletData.balance} {walletData.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Gas</span>
                  <span>0.002 ETH</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowSendModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={handleSendTransaction}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Receive className="w-5 h-5 mr-2" />
                Receive Cryptocurrency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <div className="font-mono bg-gray-50 p-3 rounded-lg">
                  {walletData.address}
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(walletData.address)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Address
                </Button>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900">Important</div>
                    <div className="text-blue-700">
                      Only send {selectedCurrency} to this address. Sending other tokens may result in permanent loss.
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowReceiveModal(false)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}