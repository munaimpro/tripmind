
# Backend API

## Public APIs

GET /destinations

GET /destinations/:id

GET /trips

GET /trips/:id

GET /hotels

GET /restaurants

GET /activities

---

## Protected APIs

GET /me

GET /my-trips

GET /saved-trips

POST /saved-trips

DELETE /saved-trips/:id

POST /reviews

---

## AI APIs

POST /ai/generate-trip

Input

- destination
- budget
- duration
- travelStyle
- groupType
- interests

Output

- itinerary
- hotels
- restaurants
- transportation
- activities
- budget
- tips

---

POST /ai/optimize-budget

Input

- aiPlanId
- newBudget

Output

- optimized itinerary
- updated hotels
- updated transport
- updated activities
- updated budget

---

## Admin

POST /destinations

PUT /destinations/:id

DELETE /destinations/:id

GET /admin/dashboard
