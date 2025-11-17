import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock user database
const mockUsers = [
  {
    id: 'user_1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'landlord',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45',
    avatar: '/api/placeholder/60/60',
    rating: 4.8,
    totalProperties: 6,
    totalTransactions: 24,
    totalRevenue: 45.2,
    isVerified: true,
    kycStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'user_2',
    email: 'alice.johnson@example.com',
    name: 'Alice Johnson',
    role: 'tenant',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatar: '/api/placeholder/60/60',
    rating: 4.6,
    totalBookings: 3,
    totalSpent: 12.5,
    isVerified: true,
    kycStatus: 'verified',
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  }
]

// GET /api/users - Get users with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const email = searchParams.get('email')
    const role = searchParams.get('role')
    const walletAddress = searchParams.get('walletAddress')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredUsers = [...mockUsers]

    // Apply filters
    if (id) {
      filteredUsers = filteredUsers.filter(user => user.id === id)
    }

    if (email) {
      filteredUsers = filteredUsers.filter(user => user.email === email)
    }

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role)
    }

    if (walletAddress) {
      filteredUsers = filteredUsers.filter(user => user.walletAddress === walletAddress)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['email', 'name', 'role', 'walletAddress']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if user already exists
    const existingUser = mockUsers.find(user => 
      user.email === body.email || user.walletAddress === body.walletAddress
    )

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email or wallet address already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      ...body,
      rating: 0,
      totalProperties: 0,
      totalTransactions: 0,
      totalRevenue: 0,
      totalBookings: 0,
      totalSpent: 0,
      isVerified: false,
      kycStatus: 'pending',
      avatar: body.avatar || '/api/placeholder/60/60',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockUsers.push(newUser)

    // Use AI for initial user assessment
    try {
      const zai = await ZAI.create()
      
      const assessment = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a risk assessment AI for a property rental platform. Assess the risk level of new users based on their profile information.'
          },
          {
            role: 'user',
            content: `Assess risk level for this new user: ${JSON.stringify(newUser)}`
          }
        ]
      })

      // Store AI assessment (in a real app, this would influence user verification)
      newUser.riskAssessment = assessment.choices[0]?.message?.content
      
      console.log('Risk assessment completed for user:', newUser.id)
    } catch (error) {
      console.error('Error performing risk assessment:', error)
    }

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// PUT /api/users - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userIndex = mockUsers.findIndex(user => user.id === id)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const user = mockUsers[userIndex]

    // Update user
    Object.assign(user, updateData)
    user.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}