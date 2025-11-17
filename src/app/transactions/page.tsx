'use client'
import { ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter,
  Download,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  Bitcoin,
  FileText,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'rent_payment' | 'security_deposit' | 'service_fee' | 'refund'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  date: string
  property?: string
  propertyId?: string
  tenant?: string
  tenantId?: string
  landlord?: string
  landlordId?: string
  txHash?: string
  gas?: number
  blockNumber?: number
  receiptUrl?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'rent_payment',
    amount: 2.5,
    currency: 'ETH',
    status: 'completed',
    date: '2024-01-15T14:30:00Z',
    property: 'Modern Downtown Apartment',
    propertyId: '1',
    tenant: 'Alice Johnson',
    tenantId: 'tenant_1',
    landlord: 'John Smith',
    landlordId: 'landlord_1',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    gas: 0.0021,
    blockNumber: 12345678,
    receiptUrl: '/receipts/receipt_1.pdf'
  },
  {
    id: '2',
    type: 'security_deposit',
    amount: 5.0,
    currency: 'ETH',
    status: 'pending',
    date: '2024-01-20T10:00:00Z',
    property: 'Luxury Beach House',
    propertyId: '2',
    tenant: 'Bob Wilson',
    tenantId: 'tenant_2',
    landlord: 'Sarah Johnson',
    landlordId: 'landlord_2',
    txHash: '0xabcd0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    gas: 0.0025,
    blockNumber: null
  },
  {
    id: '3',
    type: 'service_fee',
    amount: 0.1,
    currency: 'ETH',
    status: 'completed',
    date: '2024-01-10T09:15:00Z',
    property: 'Cozy Studio Loft',
    propertyId: '3',
    tenant: 'Carol Davis',
    tenantId: 'tenant_3',
    landlord: 'Mike Chen',
    landlordId: 'landlord_3',
    txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    gas: 0.0018,
    blockNumber: 12345670
  },
  {
    id: '4',
    type: 'refund',
    amount: 2.5,
    currency: 'ETH',
    status: 'completed',
    date: '2024-01-05T16:45:00Z',
    property: 'Mountain View Villa',
    propertyId: '4',
    tenant: 'David Martinez',
    tenantId: 'tenant_4',
    landlord: 'Robert Davis',
    landlordId: 'landlord_4',
    txHash: '0xfedcba1234567890fedcba1234567890fedcba1234567890fedcba1234567890',
    gas: 0.0022,
    blockNumber: 12345650
  }
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let filtered = transactions

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tx =>
        tx.property?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.tenant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.landlord?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.txHash?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(tx => tx.type === selectedType)
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(tx => tx.status === selectedStatus)
    }

    setFilteredTransactions(filtered)
  }, [searchQuery, selectedType, selectedStatus, transactions])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-500', icon: Clock },
      completed: { label: 'Completed', className: 'bg-green-500', icon: CheckCircle },
      failed: { label: 'Failed', className: 'bg-red-500', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || AlertCircle
    
    return (
      <Badge className={config?.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config?.label}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = {
      rent_payment: { label: 'Rent Payment', icon: Calendar, color: 'text-blue-600' },
      security_deposit: { label: 'Security Deposit', icon: Shield, color: 'text-purple-600' },
      service_fee: { label: 'Service Fee', icon: FileText, color: 'text-orange-600' },
      refund: { label: 'Refund', icon: ArrowDownRight, color: 'text-green-600' }
    }
    
    const config = typeConfig[type as keyof typeof typeConfig]
    const Icon = config?.icon || FileText
    
    return (
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${config?.color}`} />
        <span className="text-sm font-medium">{config?.label}</span>
      </div>
    )
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleDownloadReceipt = (transaction: Transaction) => {
    // Simulate receipt download
    console.log('Downloading receipt for transaction:', transaction.id)
    alert('Receipt download started!')
  }

  const handleViewOnBlockchain = (txHash: string) => {
    // Open blockchain explorer
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank')
  }

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Transaction History</h1>
              <p className="text-gray-600">View and manage your cryptocurrency transactions</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="rent_payment">Rent Payment</SelectItem>
                    <SelectItem value="security_deposit">Security Deposit</SelectItem>
                    <SelectItem value="service_fee">Service Fee</SelectItem>
                    <SelectItem value="refund">Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedType('all')
                    setSelectedStatus('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              <div className="text-sm text-gray-500">
                {filteredTransactions.length} transactions found
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedTransactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Bitcoin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-lg">
                          {transaction.amount} {transaction.currency}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getTypeIcon(transaction.type)}
                        </div>
                        {transaction.property && (
                          <div className="text-xs text-gray-500 mt-1">
                            {transaction.property}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      {getStatusBadge(transaction.status)}
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-2">
                        {transaction.tenant && (
                          <div>Tenant: {transaction.tenant}</div>
                        )}
                        {transaction.landlord && (
                          <div>Landlord: {transaction.landlord}</div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {transaction.receiptUrl && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(transaction)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        )}
                        {transaction.txHash && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewOnBlockchain(transaction.txHash!)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Blockchain
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction Details */}
                  {transaction.txHash && (
                    <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="font-medium">Transaction Hash:</span>
                          <div className="font-mono">{transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-8)}</div>
                        </div>
                        {transaction.blockNumber && (
                          <div>
                            <span className="font-medium">Block Number:</span>
                            <div>{transaction.blockNumber}</div>
                          </div>
                        )}
                        {transaction.gas && (
                          <div>
                            <span className="font-medium">Gas Used:</span>
                            <div>{transaction.gas} ETH</div>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Date:</span>
                          <div>{new Date(transaction.date).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}