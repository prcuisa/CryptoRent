'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Heart,
  Share2,
  Star,
  Calendar as CalendarIcon,
  Bitcoin,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Users,
  Camera,
  Video,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const mockProperty = {
  id: '1',
  title: 'Modern Downtown Apartment',
  description: 'Stunning modern apartment in the heart of downtown with panoramic city views. This luxurious residence features floor-to-ceiling windows, high-end finishes, and state-of-the-art amenities throughout.',
  location: 'New York, NY',
  price: 2.5,
  currency: 'ETH',
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  type: 'Apartment',
  images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
  rating: 4.8,
  reviews: 24,
  available: true,
  amenities: [
    { name: 'High-Speed WiFi', icon: Wifi },
    { name: 'Parking Space', icon: Car },
    { name: 'Fitness Center', icon: Dumbbell },
    { name: 'Swimming Pool', icon: Waves },
    { name: 'Co-working Space', icon: Users }
  ],
  landlord: {
    name: 'John Smith',
    avatar: '/api/placeholder/60/60',
    rating: 4.9,
    properties: 12,
    responseTime: '1 hour'
  },
  rules: [
    'No smoking allowed',
    'No pets allowed',
    'No parties or events',
    'Quiet hours after 10 PM',
    'Check-in: 3:00 PM',
    'Check-out: 11:00 AM'
  ],
  nearbyPlaces: [
    { name: 'Times Square', distance: '0.5 miles', type: 'attraction' },
    { name: 'Central Park', distance: '1.2 miles', type: 'park' },
    { name: 'Grand Central', distance: '0.8 miles', type: 'transport' },
    { name: 'Whole Foods', distance: '0.3 miles', type: 'shopping' }
  ]
}

const mockReviews = [
  {
    id: '1',
    user: 'Alice Johnson',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Amazing apartment with stunning views! The host was very responsive and the location is perfect.'
  },
  {
    id: '2',
    user: 'Bob Wilson',
    avatar: '/api/placeholder/40/40',
    rating: 4,
    date: '1 month ago',
    comment: 'Great place to stay. Very clean and well-maintained. Would definitely recommend!'
  }
]

export default function PropertyDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return 0
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    return nights * mockProperty.price
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Bitcoin className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Home className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                1 / {mockProperty.images.length}
              </div>
              <div className="flex gap-2 mt-4">
                {mockProperty.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-purple-600' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{mockProperty.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mockProperty.location}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{mockProperty.rating}</span>
                      <span className="text-gray-500 ml-1">({mockProperty.reviews} reviews)</span>
                    </div>
                    <Badge className={mockProperty.available ? "bg-green-500" : "bg-red-500"}>
                      {mockProperty.available ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {mockProperty.price} {mockProperty.currency}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-2" />
                  {mockProperty.bedrooms} bedrooms
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-2" />
                  {mockProperty.bathrooms} bathrooms
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-2" />
                  {mockProperty.area} sqft
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{mockProperty.description}</p>
            </div>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {mockProperty.amenities.map((amenity, index) => {
                    const Icon = amenity.icon
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockProperty.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nearby Places */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProperty.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{place.type}</div>
                      </div>
                      <div className="text-sm text-gray-600">{place.distance}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  What guests are saying about this property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Book This Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-in Date</label>
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-out Date</label>
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    className="rounded-md border"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{mockProperty.price} ETH x nights</span>
                    <span>{calculateTotal().toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>0.1 ETH</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">{(calculateTotal() + 0.1).toFixed(2)} ETH</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!checkInDate || !checkOutDate}
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Secure blockchain payment
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium">{mockProperty.landlord.name}</div>
                    <div className="text-sm text-gray-500">Verified Host</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {mockProperty.landlord.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Properties</span>
                    <span>{mockProperty.landlord.properties}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span>{mockProperty.landlord.responseTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bitcoin className="w-5 h-5 mr-2" />
                Complete Your Booking
              </CardTitle>
              <CardDescription>
                Pay with cryptocurrency to secure your rental
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                <div className="text-2xl font-bold text-purple-600">
                  {(calculateTotal() + 0.1).toFixed(2)} ETH
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Cryptocurrency</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Ethereum (ETH)</option>
                  <option>Bitcoin (BTC)</option>
                  <option>USDC</option>
                  <option>USDT</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Wallet Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900">Smart Contract Protection</div>
                    <div className="text-blue-700">Your payment is protected by an escrow smart contract until check-in.</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Confirm Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}