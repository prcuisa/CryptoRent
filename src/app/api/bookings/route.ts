import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock booking database
const mockBookings = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Modern Downtown Apartment',
    tenantId: 'tenant_1',
    tenantName: 'Alice Johnson',
    landlordId: 'landlord_1',
    landlordName: 'John Smith',
    checkIn: '2024-01-01',
    checkOut: '2024-03-01',
    status: 'active',
    amount: 7.5,
    currency: 'ETH',
    securityDeposit: 2.5,
    totalPaid: 7.5,
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2024-01-01T15:00:00Z'
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Luxury Beach House',
    tenantId: 'tenant_2',
    tenantName: 'Bob Wilson',
    landlordId: 'landlord_2',
    landlordName: 'Sarah Johnson',
    checkIn: '2024-02-01',
    checkOut: '2024-04-01',
    status: 'pending',
    amount: 10.0,
    currency: 'ETH',
    securityDeposit: 5.0,
    totalPaid: 5.0,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  }
]

// GET /api/bookings - Get bookings with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredBookings = [...mockBookings]

    // Apply filters
    if (userId) {
      filteredBookings = filteredBookings.filter(booking =>
        booking.tenantId === userId || booking.landlordId === userId
      )
    }

    if (propertyId) {
      filteredBookings = filteredBookings.filter(booking =>
        booking.propertyId === propertyId
      )
    }

    if (status) {
      filteredBookings = filteredBookings.filter(booking =>
        booking.status === status
      )
    }

    // Sort by creation date (newest first)
    filteredBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedBookings,
      pagination: {
        page,
        limit,
        total: filteredBookings.length,
        totalPages: Math.ceil(filteredBookings.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['propertyId', 'tenantId', 'landlordId', 'checkIn', 'checkOut', 'amount', 'currency']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check for booking conflicts
    const conflictingBooking = mockBookings.find(booking =>
      booking.propertyId === body.propertyId &&
      booking.status !== 'cancelled' &&
      new Date(body.checkIn) < new Date(booking.checkOut) &&
      new Date(body.checkOut) > new Date(booking.checkIn)
    )

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: 'Property is already booked for the selected dates' },
        { status: 409 }
      )
    }

    // Create new booking
    const newBooking = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      securityDeposit: body.amount * 0.5, // 50% of monthly rent as security deposit
      totalPaid: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockBookings.push(newBooking)

    // Use AI to generate smart contract terms
    try {
      const zai = await ZAI.create()
      
      const contractTerms = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a smart contract generator for property rentals. Generate fair and comprehensive terms for a rental agreement.'
          },
          {
            role: 'user',
            content: `Generate smart contract terms for this booking: ${JSON.stringify(newBooking)}`
          }
        ]
      })

      // Store generated terms (in a real app, this would be deployed to blockchain)
      newBooking.smartContractTerms = contractTerms.choices[0]?.message?.content
      
      console.log('Smart contract terms generated for booking:', newBooking.id)
    } catch (error) {
      console.error('Error generating smart contract terms:', error)
    }

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings - Update booking status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, paymentAmount } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    const bookingIndex = mockBookings.findIndex(booking => booking.id === id)
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    const booking = mockBookings[bookingIndex]

    // Update booking
    if (status) {
      booking.status = status
    }

    if (paymentAmount) {
      booking.totalPaid += paymentAmount
    }

    booking.updatedAt = new Date().toISOString()

    // If fully paid, activate booking
    if (booking.totalPaid >= booking.amount + booking.securityDeposit && booking.status === 'pending') {
      booking.status = 'confirmed'
    }

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking updated successfully'
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}