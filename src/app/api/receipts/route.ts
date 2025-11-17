import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock receipt database
const mockReceipts = [
  {
    id: 'receipt_1',
    transactionId: '1',
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
    blockNumber: 12345678,
    gas: 0.0021,
    smartContractAddress: '0x9876543210fedcba9876543210fedcba9876543210',
    receiptUrl: '/receipts/receipt_1.pdf',
    createdAt: new Date().toISOString()
  }
]

// GET /api/receipts - Get receipts with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const transactionId = searchParams.get('transactionId')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredReceipts = [...mockReceipts]

    // Apply filters
    if (userId) {
      filteredReceipts = filteredReceipts.filter(receipt =>
        receipt.tenantId === userId || receipt.landlordId === userId
      )
    }

    if (transactionId) {
      filteredReceipts = filteredReceipts.filter(receipt =>
        receipt.transactionId === transactionId
      )
    }

    if (type) {
      filteredReceipts = filteredReceipts.filter(receipt =>
        receipt.type === type
      )
    }

    // Sort by date (newest first)
    filteredReceipts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedReceipts = filteredReceipts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedReceipts,
      pagination: {
        page,
        limit,
        total: filteredReceipts.length,
        totalPages: Math.ceil(filteredReceipts.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching receipts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch receipts' },
      { status: 500 }
    )
  }
}

// POST /api/receipts - Generate a new receipt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, userId } = body
    
    if (!transactionId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID and User ID are required' },
        { status: 400 }
      )
    }

    // Generate receipt using AI
    const zai = await ZAI.create()
    
    const receiptContent = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a blockchain receipt generator. Generate a detailed, professional receipt for cryptocurrency transactions. Include all necessary details for legal and tax purposes.'
        },
        {
          role: 'user',
          content: `Generate a receipt for transaction ID: ${transactionId} for user: ${userId}. Include transaction details, smart contract information, and blockchain verification data.`
        }
      ]
    })

    // Create new receipt
    const newReceipt = {
      id: `receipt_${Date.now()}`,
      transactionId,
      type: body.type || 'rent_payment',
      amount: body.amount,
      currency: body.currency || 'ETH',
      status: 'completed',
      date: new Date().toISOString(),
      property: body.property,
      propertyId: body.propertyId,
      tenant: body.tenant,
      tenantId: body.tenantId,
      landlord: body.landlord,
      landlordId: body.landlordId,
      txHash: body.txHash,
      blockNumber: body.blockNumber,
      gas: body.gas,
      smartContractAddress: body.smartContractAddress,
      receiptUrl: `/receipts/receipt_${Date.now()}.pdf`,
      content: receiptContent.choices[0]?.message?.content,
      createdAt: new Date().toISOString()
    }

    mockReceipts.push(newReceipt)

    // Generate PDF receipt (in a real app, you'd use a PDF library)
    console.log('PDF receipt generated:', newReceipt.receiptUrl)

    return NextResponse.json({
      success: true,
      data: newReceipt,
      message: 'Receipt generated successfully'
    })
  } catch (error) {
    console.error('Error generating receipt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate receipt' },
      { status: 500 }
    )
  }
}

// GET /api/receipts/[id] - Get specific receipt
export async function GET_RECEIPT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    const receipt = mockReceipts.find(r => r.id === id)
    
    if (!receipt) {
      return NextResponse.json(
        { success: false, error: 'Receipt not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: receipt
    })
  } catch (error) {
    console.error('Error fetching receipt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch receipt' },
      { status: 500 }
    )
  }
}