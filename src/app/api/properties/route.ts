import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock database for demonstration
const mockProperties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stunning modern apartment in the heart of downtown with panoramic city views',
    location: 'New York, NY',
    price: 2.5,
    currency: 'ETH',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    images: ['/api/placeholder/400/300'],
    rating: 4.8,
    reviews: 24,
    available: true,
    amenities: ['WiFi', 'Parking', 'Gym', 'Pool'],
    landlord: {
      name: 'John Smith',
      avatar: '/api/placeholder/40/40',
      rating: 4.9
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Luxury Beach House',
    description: 'Beautiful beachfront property with private beach access and ocean views',
    location: 'Miami Beach, FL',
    price: 5.0,
    currency: 'ETH',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: 'House',
    images: ['/api/placeholder/400/300'],
    rating: 4.9,
    reviews: 18,
    available: true,
    amenities: ['WiFi', 'Parking', 'Pool', 'Beach Access'],
    landlord: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/40/40',
      rating: 4.8
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// GET /api/properties - Get all properties with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredProperties = [...mockProperties]

    // Apply filters
    if (search) {
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (type && type !== 'all') {
      filteredProperties = filteredProperties.filter(property =>
        property.type.toLowerCase() === type.toLowerCase()
      )
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price >= parseFloat(minPrice)
      )
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price <= parseFloat(maxPrice)
      )
    }

    if (bedrooms && bedrooms !== 'all') {
      filteredProperties = filteredProperties.filter(property =>
        property.bedrooms.toString() === bedrooms
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedProperties,
      pagination: {
        page,
        limit,
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create a new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'location', 'price', 'bedrooms', 'bathrooms', 'area', 'type']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create new property
    const newProperty = {
      id: Date.now().toString(),
      ...body,
      rating: 0,
      reviews: 0,
      available: true,
      images: body.images || ['/api/placeholder/400/300'],
      amenities: body.amenities || [],
      landlord: body.landlord || {
        name: 'Unknown',
        avatar: '/api/placeholder/40/40',
        rating: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockProperties.push(newProperty)

    return NextResponse.json({
      success: true,
      data: newProperty,
      message: 'Property created successfully'
    })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create property' },
      { status: 500 }
    )
  }
}