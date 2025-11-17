import { NextRequest, NextResponse } from 'next/server'

// Mock receipt database (same as parent route)
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

// GET /api/receipts/[id] - Get specific receipt
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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