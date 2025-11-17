import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock transaction database
const mockTransactions = [
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
    createdAt: new Date().toISOString()
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
    blockNumber: null,
    createdAt: new Date().toISOString()
  }
]

// GET /api/transactions - Get transactions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const propertyId = searchParams.get('propertyId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredTransactions = [...mockTransactions]

    // Apply filters
    if (userId) {
      filteredTransactions = filteredTransactions.filter(tx =>
        tx.tenantId === userId || tx.landlordId === userId
      )
    }

    if (type) {
      filteredTransactions = filteredTransactions.filter(tx =>
        tx.type === type
      )
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter(tx =>
        tx.status === status
      )
    }

    if (propertyId) {
      filteredTransactions = filteredTransactions.filter(tx =>
        tx.propertyId === propertyId
      )
    }

    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedTransactions,
      pagination: {
        page,
        limit,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['type', 'amount', 'currency', 'propertyId', 'tenantId', 'landlordId']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create new transaction
    const newTransaction = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      gas: 0.002,
      blockNumber: null,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    mockTransactions.push(newTransaction)

    // Simulate blockchain processing
    setTimeout(async () => {
      try {
        const zai = await ZAI.create()
        
        // Use AI to validate transaction
        const validation = await zai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are a blockchain transaction validator. Validate if this transaction is legitimate and safe to process.'
            },
            {
              role: 'user',
              content: `Transaction details: ${JSON.stringify(newTransaction)}. Is this transaction valid?`
            }
          ]
        })

        // Update transaction status based on AI validation
        newTransaction.status = 'completed'
        newTransaction.blockNumber = Math.floor(Math.random() * 100000000)
        
        console.log('Transaction validated and completed:', newTransaction.id)
      } catch (error) {
        console.error('Error processing transaction:', error)
        newTransaction.status = 'failed'
      }
    }, 5000) // Simulate 5 second processing time

    return NextResponse.json({
      success: true,
      data: newTransaction,
      message: 'Transaction created and is being processed'
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}