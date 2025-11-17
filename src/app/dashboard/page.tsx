'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Home, 
  Bitcoin,
  Calendar,
  Star,
  TrendingUp,
  Users,
  Settings,
  Bell,
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'landlord', // 'tenant' or 'landlord'
  walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45',
  joinedDate: 'January 2024',
  rating: 4.8,
  totalProperties: 6,
  totalTransactions: 24,
  totalRevenue: 45.2,
  avatar: '/api/placeholder/60/60'
}

const mockProperties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    location: 'New York, NY',
    price: 2.5,
    currency: 'ETH',
    status: 'occupied',
    tenant: 'Alice Johnson',
    rating: 4.8,
    views: 245,
    nextPayment: '2024-02-01'
  },
  {
    id: '2',
    title: 'Luxury Beach House',
    location: 'Miami Beach, FL',
    price: 5.0,
    currency: 'ETH',
    status: 'available',
    tenant: null,
    rating: 4.9,
    views: 189,
    nextPayment: null
  },
  {
    id: '3',
    title: 'Cozy Studio Loft',
    location: 'San Francisco, CA',
    price: 1.8,
    currency: 'ETH',
    status: 'maintenance',
    tenant: null,
    rating: 4.6,
    views: 156,
    nextPayment: null
  }
]

const mockTransactions = [
  {
    id: '1',
    type: 'rent_payment',
    amount: 2.5,
    currency: 'ETH',
    status: 'completed',
    date: '2024-01-15',
    property: 'Modern Downtown Apartment',
    tenant: 'Alice Johnson',
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    type: 'security_deposit',
    amount: 5.0,
    currency: 'ETH',
    status: 'pending',
    date: '2024-01-20',
    property: 'Luxury Beach House',
    tenant: 'Bob Wilson',
    txHash: '0xabcd...efgh'
  },
  {
    id: '3',
    type: 'service_fee',
    amount: 0.1,
    currency: 'ETH',
    status: 'completed',
    date: '2024-01-10',
    property: 'Cozy Studio Loft',
    tenant: 'Carol Davis',
    txHash: '0x9876...5432'
  }
]

const mockBookings = [
  {
    id: '1',
    property: 'Modern Downtown Apartment',
    tenant: 'Alice Johnson',
    checkIn: '2024-01-01',
    checkOut: '2024-03-01',
    status: 'active',
    amount: 7.5,
    currency: 'ETH'
  },
  {
    id: '2',
    property: 'Luxury Beach House',
    tenant: 'Bob Wilson',
    checkIn: '2024-02-01',
    checkOut: '2024-04-01',
    status: 'pending',
    amount: 10.0,
    currency: 'ETH'
  }
]

const mockNotifications = [
  {
    id: '1',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Alice Johnson paid 2.5 ETH for Modern Downtown Apartment',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'booking_request',
    title: 'New Booking Request',
    message: 'Bob Wilson wants to book Luxury Beach House',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Maintenance Required',
    message: 'Cozy Studio Loft needs maintenance',
    time: '1 day ago',
    read: true
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddProperty, setShowAddProperty] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      occupied: { label: 'Occupied', className: 'bg-green-500' },
      available: { label: 'Available', className: 'bg-blue-500' },
      maintenance: { label: 'Maintenance', className: 'bg-yellow-500' },
      active: { label: 'Active', className: 'bg-green-500' },
      pending: { label: 'Pending', className: 'bg-yellow-500' },
      completed: { label: 'Completed', className: 'bg-green-500' },
      failed: { label: 'Failed', className: 'bg-red-500' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config?.className}>{config?.label}</Badge>
  }

  const getTransactionIcon = (type: string) => {
    const icons = {
      rent_payment: <Calendar className="w-4 h-4" />,
      security_deposit: <Shield className="w-4 h-4" />,
      service_fee: <TrendingUp className="w-4 h-4" />
    }
    return icons[type as keyof typeof icons] || <Wallet className="w-4 h-4" />
  }

  const getNotificationIcon = (type: string) => {
    const icons = {
      payment_received: <CheckCircle className="w-4 h-4 text-green-500" />,
      booking_request: <AlertCircle className="w-4 h-4 text-yellow-500" />,
      maintenance: <Clock className="w-4 h-4 text-orange-500" />
    }
    return icons[type as keyof typeof icons] || <Bell className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Badge variant="outline" className="capitalize">
                {mockUserData.role}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {mockNotifications.filter(n => !n.read).length}
                </span>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">{mockUserData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.totalProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <Bitcoin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.totalRevenue} ETH</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockProperties.filter(p => p.status === 'occupied').length}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.rating}</div>
                  <p className="text-xs text-muted-foreground">
                    From {mockUserData.totalTransactions} reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest cryptocurrency transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{transaction.property}</div>
                            <div className="text-xs text-gray-500">{transaction.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">
                            {transaction.amount} {transaction.currency}
                          </div>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Recent updates and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-gray-500">{notification.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Properties</h2>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setShowAddProperty(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{property.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </CardDescription>
                      </div>
                      {getStatusBadge(property.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                          {property.price} {property.currency}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {property.rating}
                        </div>
                      </div>
                      
                      {property.tenant && (
                        <div className="text-sm">
                          <span className="text-gray-600">Tenant:</span> {property.tenant}
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {property.views} views
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <span className="text-sm font-medium capitalize">
                                {transaction.type.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.property}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">
                              {transaction.amount} {transaction.currency}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Bookings</h2>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Export Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{booking.property}</h3>
                          <p className="text-sm text-gray-600">
                            Tenant: {booking.tenant}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.checkIn} - {booking.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {booking.amount} {booking.currency}
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>Property occupancy statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}