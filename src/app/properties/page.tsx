'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Search, 
  Filter,
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Heart,
  Share2,
  Calendar,
  Bitcoin,
  Home,
  Grid,
  List,
  Star
} from 'lucide-react'

interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  currency: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  images: string[]
  rating: number
  reviews: number
  available: boolean
  amenities: string[]
  landlord: {
    name: string
    avatar: string
    rating: number
  }
}

const mockProperties: Property[] = [
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
    }
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
    }
  },
  {
    id: '3',
    title: 'Cozy Studio Loft',
    description: 'Charming studio loft in artistic neighborhood with exposed brick walls',
    location: 'San Francisco, CA',
    price: 1.8,
    currency: 'ETH',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: 'Studio',
    images: ['/api/placeholder/400/300'],
    rating: 4.6,
    reviews: 31,
    available: true,
    amenities: ['WiFi', 'Gym', 'Laundry'],
    landlord: {
      name: 'Mike Chen',
      avatar: '/api/placeholder/40/40',
      rating: 4.7
    }
  },
  {
    id: '4',
    title: 'Mountain View Villa',
    description: 'Elegant villa with breathtaking mountain views and modern amenities',
    location: 'Aspen, CO',
    price: 8.5,
    currency: 'ETH',
    bedrooms: 5,
    bathrooms: 4,
    area: 4000,
    type: 'Villa',
    images: ['/api/placeholder/400/300'],
    rating: 5.0,
    reviews: 12,
    available: false,
    amenities: ['WiFi', 'Parking', 'Pool', 'Hot Tub', 'Ski Access'],
    landlord: {
      name: 'Robert Davis',
      avatar: '/api/placeholder/40/40',
      rating: 5.0
    }
  },
  {
    id: '5',
    title: 'Urban Penthouse',
    description: 'Luxurious penthouse with rooftop terrace and city skyline views',
    location: 'Chicago, IL',
    price: 4.2,
    currency: 'ETH',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    type: 'Penthouse',
    images: ['/api/placeholder/400/300'],
    rating: 4.7,
    reviews: 8,
    available: true,
    amenities: ['WiFi', 'Parking', 'Gym', 'Rooftop', 'Concierge'],
    landlord: {
      name: 'Emily Wilson',
      avatar: '/api/placeholder/40/40',
      rating: 4.8
    }
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    description: 'Spacious family home in quiet neighborhood with large backyard',
    location: 'Austin, TX',
    price: 3.0,
    currency: 'ETH',
    bedrooms: 4,
    bathrooms: 2,
    area: 2800,
    type: 'House',
    images: ['/api/placeholder/400/300'],
    rating: 4.5,
    reviews: 15,
    available: true,
    amenities: ['WiFi', 'Parking', 'Garden', 'Pet Friendly'],
    landlord: {
      name: 'David Martinez',
      avatar: '/api/placeholder/40/40',
      rating: 4.6
    }
  }
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedBedrooms, setSelectedBedrooms] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = properties

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by property type
    if (selectedType !== 'all') {
      filtered = filtered.filter(property => property.type.toLowerCase() === selectedType.toLowerCase())
    }

    // Filter by price range
    filtered = filtered.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    )

    // Filter by bedrooms
    if (selectedBedrooms !== 'all') {
      filtered = filtered.filter(property => property.bedrooms.toString() === selectedBedrooms)
    }

    setFilteredProperties(filtered)
  }, [searchQuery, selectedType, priceRange, selectedBedrooms, properties])

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <Home className="w-16 h-16 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={property.available ? "bg-green-500" : "bg-red-500"}>
            {property.available ? "Available" : "Occupied"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{property.title}</CardTitle>
          <div className="text-right">
            <div className="text-xl font-bold text-purple-600">
              {property.price} {property.currency}
            </div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms} bed
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} bath
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area} sqft
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({property.reviews} reviews)</span>
          </div>
          <Badge variant="outline">{property.type}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-600">{property.landlord.name}</span>
          <Star className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-gray-500">{property.landlord.rating}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by location, property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 w-full lg:w-80"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Bitcoin className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range (ETH/month): {priceRange[0]} - {priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                  <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
                  setSelectedType('all')
                  setPriceRange([0, 10])
                  setSelectedBedrooms('all')
                  setSearchQuery('')
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredProperties.length} Properties Found
              </h2>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}