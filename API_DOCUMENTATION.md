# 📡 API Documentation - Next Trip Anywhere

## 🎯 What Is This Document?

This document explains all the API endpoints (like phone numbers for data) that the Next Trip Anywhere website uses. Think of APIs as waiters in a restaurant - you tell them what you want, and they bring it to you!

## 📚 Table of Contents

1. [API Overview](#-api-overview)
2. [Base Configuration](#-base-configuration)
3. [Authentication](#-authentication)
4. [Endpoints](#-endpoints)
   - [Flights API](#-flights-api)
   - [Cruises API](#-cruises-api)
   - [Packages API](#-packages-api)
   - [Lead Capture API](#-lead-capture-api)
   - [Location API](#-location-api)
5. [Error Handling](#-error-handling)
6. [Rate Limiting](#-rate-limiting)
7. [Testing APIs](#-testing-apis)
8. [Mock Data](#-mock-data)
9. [Future API Plans](#-future-api-plans)

## 🌐 API Overview

### How APIs Work (Simple Explanation)

```
Your Website → Asks for Data → API Server → Sends Data Back → Website Shows It
     📱             📤              🖥️             📥              📱
```

### Current API Status

⚠️ **Important**: The website currently uses **mock data** (fake data for testing). Real APIs will be connected in the future.

### API Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Frontend (Website)                  │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Components │  │    Hooks    │  │   Services  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼ HTTP Requests
┌──────────────────────────────────────────────────────┐
│                    API Gateway                       │
│              (Future Implementation)                 │
└───────────────────────┬──────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Flights API │ │ Cruises API  │ │ Packages API │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🔧 Base Configuration

### API Base URLs

```javascript
// Development (your computer)
const DEV_API_URL = 'http://localhost:5000/api'

// Production (live website)
const PROD_API_URL = 'https://api.nexttripanywhere.com'

// Current (automatically selected)
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEV_API_URL
```

### Request Headers

All API requests should include these headers:

```javascript
headers: {
  'Content-Type': 'application/json',     // Tell server we're sending JSON
  'Accept': 'application/json',           // Tell server we want JSON back
  'X-API-Version': 'v1',                 // API version
  'X-Client-Version': '1.0.0'            // App version
}
```

## 🔐 Authentication

### Current Status

**No authentication required** (website is public)

### Future Authentication (Planned)

```javascript
// Future: API Key authentication
headers: {
  'Authorization': 'Bearer YOUR_API_KEY_HERE'
}

// Future: User authentication
headers: {
  'Authorization': 'Bearer USER_JWT_TOKEN'
}
```

## 📍 Endpoints

### ✈️ Flights API

#### Search Flights

**What it does**: Find available flights  
**Address**: `GET /api/flights/search`  
**Method**: GET (like asking a question)

**📝 What to Send (Query Parameters)**:

```
?from=NYC           # Departure city code
&to=LAX            # Arrival city code
&date=2024-12-25   # Travel date
&passengers=2      # Number of travelers
&class=economy     # Seat class
```

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "flights": [
      {
        "id": "FL123",
        "airline": "Example Air",
        "departure": {
          "airport": "JFK",
          "city": "New York",
          "time": "08:00",
          "date": "2024-12-25"
        },
        "arrival": {
          "airport": "LAX",
          "city": "Los Angeles",
          "time": "11:30",
          "date": "2024-12-25"
        },
        "price": {
          "amount": 299,
          "currency": "USD",
          "perPerson": true
        },
        "duration": "5h 30m",
        "stops": 0,
        "availableSeats": 45
      }
    ],
    "totalResults": 25,
    "filters": {
      "airlines": ["Example Air", "Sky Airlines"],
      "priceRange": { "min": 199, "max": 899 },
      "stops": [0, 1, 2]
    }
  }
}
```

**🎮 Try It Yourself**:

```bash
curl "http://localhost:5000/api/flights/search?from=NYC&to=LAX&date=2024-12-25&passengers=2"
```

#### Get Flight Details

**What it does**: Get information about one specific flight  
**Address**: `GET /api/flights/{flightId}`  
**Method**: GET

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "flight": {
      "id": "FL123",
      "airline": "Example Air",
      "aircraft": "Boeing 737",
      "amenities": ["WiFi", "Entertainment", "Meals"],
      "baggage": {
        "carry_on": "1 bag",
        "checked": "2 bags (50 lbs each)"
      },
      "seats": {
        "economy": { "available": 45, "price": 299 },
        "business": { "available": 8, "price": 899 }
      }
    }
  }
}
```

### 🚢 Cruises API

#### Search Cruises

**What it does**: Find available cruises  
**Address**: `GET /api/cruises/search`  
**Method**: GET

**📝 What to Send**:

```
?departure_port=Miami     # Where cruise starts
&destination=Caribbean    # Where it goes
&duration=7              # Days at sea
&date=2024-12-20        # Departure date
```

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "cruises": [
      {
        "id": "CR456",
        "name": "Caribbean Paradise",
        "cruise_line": "Ocean Cruises",
        "ship": "MS Paradise",
        "departure": {
          "port": "Miami",
          "date": "2024-12-20",
          "time": "16:00"
        },
        "itinerary": [
          { "day": 1, "port": "Miami", "arrive": null, "depart": "16:00" },
          { "day": 2, "port": "At Sea", "arrive": null, "depart": null },
          { "day": 3, "port": "Cozumel", "arrive": "08:00", "depart": "17:00" }
        ],
        "duration": "7 nights",
        "price": {
          "interior": 599,
          "ocean_view": 799,
          "balcony": 999,
          "suite": 1599,
          "currency": "USD",
          "per_person": true
        }
      }
    ]
  }
}
```

#### Get Cruise Details

**What it does**: Get detailed cruise information  
**Address**: `GET /api/cruises/{cruiseId}`  
**Method**: GET

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "cruise": {
      "id": "CR456",
      "ship_details": {
        "capacity": 3000,
        "crew": 1200,
        "amenities": ["Pool", "Spa", "Casino", "Theater"],
        "dining": ["Main Dining", "Buffet", "Specialty Restaurants"]
      },
      "included": ["Meals", "Entertainment", "Pool Access"],
      "not_included": ["Drinks", "Excursions", "Spa", "WiFi"]
    }
  }
}
```

### 📦 Packages API

#### Search Vacation Packages

**What it does**: Find complete vacation packages  
**Address**: `GET /api/packages/search`  
**Method**: GET

**📝 What to Send**:

```
?destination=Cancun      # Where to go
&duration=5             # Number of nights
&travelers=2            # Number of people
&type=all-inclusive     # Package type
```

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "packages": [
      {
        "id": "PKG789",
        "name": "Cancun Paradise Getaway",
        "type": "all-inclusive",
        "destination": "Cancun, Mexico",
        "duration": "5 nights",
        "hotel": {
          "name": "Beach Resort & Spa",
          "rating": 4.5,
          "room_type": "Ocean View"
        },
        "flights": {
          "included": true,
          "departure": "NYC",
          "airline": "Example Air"
        },
        "includes": [
          "Round-trip flights",
          "Hotel accommodation",
          "All meals and drinks",
          "Airport transfers",
          "Resort activities"
        ],
        "price": {
          "per_person": 899,
          "total": 1798,
          "currency": "USD"
        }
      }
    ]
  }
}
```

### 📧 Lead Capture API

#### Submit Lead Form

**What it does**: Save customer contact information  
**Address**: `POST /api/leads`  
**Method**: POST (like sending a letter)

**📝 What to Send**:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "555-0123",
  "destination": "Caribbean",
  "travel_dates": "December 2024",
  "travelers": 2,
  "budget": "$2000-3000",
  "interests": ["cruises", "all-inclusive"],
  "message": "Looking for a romantic getaway"
}
```

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "lead_id": "LEAD-12345",
    "message": "Thank you! We'll contact you within 24 hours.",
    "next_steps": [
      "Check your email for confirmation",
      "A travel agent will call you",
      "Prepare your travel preferences"
    ]
  }
}
```

### 📍 Location API

#### Get Location Deals

**What it does**: Get deals from specific cities  
**Address**: `GET /api/locations/{city}/deals`  
**Method**: GET

**📝 Example**: `/api/locations/nyc/deals`

**📬 What You Get Back**:

```json
{
  "success": true,
  "data": {
    "city": "New York City",
    "airports": ["JFK", "LGA", "EWR"],
    "deals": {
      "flights": [
        {
          "destination": "Miami",
          "price": 99,
          "dates": "Jan-Feb 2024"
        }
      ],
      "cruises": [
        {
          "name": "Bahamas Quick Escape",
          "price": 399,
          "duration": "3 nights"
        }
      ],
      "packages": [
        {
          "destination": "Cancun",
          "price": 699,
          "includes": "Flight + Hotel"
        }
      ]
    }
  }
}
```

## ❌ Error Handling

### Error Response Format

When something goes wrong, you'll get:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "What went wrong (human readable)",
    "details": "Technical details (optional)",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

### Common Error Codes

| Code  | Meaning           | What to Do      |
| ----- | ----------------- | --------------- |
| `400` | Bad Request       | Check your data |
| `401` | Unauthorized      | Check API key   |
| `404` | Not Found         | Check the URL   |
| `429` | Too Many Requests | Wait and retry  |
| `500` | Server Error      | Try again later |

### Error Examples

#### Missing Required Field

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required field: destination",
    "details": {
      "field": "destination",
      "required": true
    }
  }
}
```

#### Invalid Date Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FORMAT",
    "message": "Date must be in YYYY-MM-DD format",
    "details": {
      "field": "date",
      "provided": "12/25/2024",
      "expected": "2024-12-25"
    }
  }
}
```

## ⏱️ Rate Limiting

### Current Limits (Future Implementation)

| Endpoint Type | Limit        | Window     |
| ------------- | ------------ | ---------- |
| Search        | 100 requests | Per minute |
| Details       | 300 requests | Per minute |
| Lead Submit   | 10 requests  | Per minute |

### Rate Limit Headers

```
X-RateLimit-Limit: 100        # Maximum requests
X-RateLimit-Remaining: 75     # Requests left
X-RateLimit-Reset: 1234567890  # When limit resets
```

## 🧪 Testing APIs

### Using cURL (Command Line)

```bash
# Test flight search
curl "http://localhost:5000/api/flights/search?from=NYC&to=LAX"

# Test with headers
curl -H "Content-Type: application/json" \
     -H "X-API-Version: v1" \
     "http://localhost:5000/api/flights/search?from=NYC&to=LAX"

# Test POST request
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com"}' \
     "http://localhost:5000/api/leads"
```

### Using JavaScript (In Your Code)

```javascript
// Simple GET request
async function searchFlights() {
  try {
    const response = await fetch('/api/flights/search?from=NYC&to=LAX')
    const data = await response.json()
    console.log('Flights:', data)
  } catch (error) {
    console.error('Error:', error)
  }
}

// POST request with data
async function submitLead(formData) {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    console.log('Lead submitted:', data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Using Postman (Visual Tool)

1. Download Postman from [postman.com](https://postman.com)
2. Create new request
3. Enter URL: `http://localhost:5000/api/flights/search`
4. Add query parameters
5. Click "Send"
6. View response

## 🎭 Mock Data

### Current Mock Implementation

Since we don't have a real backend yet, the app uses mock data:

```javascript
// lib/api/mock-data.js
export const mockFlights = [
  {
    id: 'MOCK-FL001',
    airline: 'Mock Airways',
    from: 'NYC',
    to: 'LAX',
    price: 299,
    duration: '5h 30m',
  },
]

// Returns mock data instead of real API call
export async function searchFlights(params) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    success: true,
    data: { flights: mockFlights },
  }
}
```

### Testing with Mock Data

```javascript
// In development, use mock data
const USE_MOCK = process.env.NODE_ENV === 'development'

async function getFlights(params) {
  if (USE_MOCK) {
    return getMockFlights(params) // Use fake data
  } else {
    return getRealFlights(params) // Use real API
  }
}
```

## 🔮 Future API Plans

### Phase 1: Basic Integration (Q1 2025)

- ✅ Connect to real flight search API
- ✅ Connect to cruise booking API
- ✅ Implement lead capture backend
- ✅ Add basic authentication

### Phase 2: Advanced Features (Q2 2025)

- 🔄 Real-time availability checking
- 🔄 Price alerts API
- 🔄 Booking management API
- 🔄 Payment processing integration

### Phase 3: Personalization (Q3 2025)

- 🔄 User preferences API
- 🔄 Recommendation engine
- 🔄 Saved searches
- 🔄 Travel history tracking

### Phase 4: Enterprise Features (Q4 2025)

- 🔄 Partner API access
- 🔄 Bulk booking API
- 🔄 Analytics API
- 🔄 Webhook support

## 📝 API Best Practices

### For Developers

1. **Always Handle Errors**

   ```javascript
   try {
     const data = await fetchAPI()
   } catch (error) {
     showErrorMessage(error)
   }
   ```

2. **Cache When Possible**

   ```javascript
   const cache = new Map()

   async function getCachedData(key) {
     if (cache.has(key)) {
       return cache.get(key)
     }
     const data = await fetchAPI()
     cache.set(key, data)
     return data
   }
   ```

3. **Use Loading States**

   ```javascript
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState(null)

   async function fetchData() {
     setLoading(true)
     try {
       const result = await fetchAPI()
       setData(result)
     } finally {
       setLoading(false)
     }
   }
   ```

4. **Validate Input**
   ```javascript
   function validateSearchParams(params) {
     if (!params.from) throw new Error('From city required')
     if (!params.to) throw new Error('To city required')
     if (!isValidDate(params.date)) throw new Error('Invalid date')
     return true
   }
   ```

## 🆘 Getting Help

### API Issues?

1. Check this documentation first
2. Look at the error message
3. Check browser console for details
4. Try with mock data to isolate issue
5. Contact support if still stuck

### Common Problems

| Problem         | Solution                            |
| --------------- | ----------------------------------- |
| "Network Error" | Check internet connection           |
| "404 Not Found" | Check API URL is correct            |
| "Invalid JSON"  | Check request format                |
| "CORS Error"    | Backend needs to allow frontend URL |

---

**Remember**: APIs are just ways for programs to talk to each other. If you can order pizza by phone, you can understand APIs! 🍕📞
