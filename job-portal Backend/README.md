# Job Portal

This repo now contains:

- An Express + MongoDB backend under the project root
- A React + Vite frontend inside `client/`

## Run the backend

1. Install dependencies in the project root:

```bash
npm install
```

2. Create a root `.env` file using `.env.example` and set your values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/job-portal
```

3. Start the API:

```bash
npm run dev
```

4. Optional: seed the database with starter jobs:

```bash
npm run seed
```

The backend exposes:

- `GET /api/health`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `DELETE /api/jobs/:id`

`GET /api/jobs` also supports:

- `search`
- `page`
- `limit`

## Run the frontend

1. Open a second terminal and move into the client:

```bash
cd client
npm install
```

2. Create `client/.env` from `client/.env.example` if you want to override the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the frontend:

```bash
npm run dev
```

## Sample job payload

```json
{
  "title": "Full Stack Developer",
  "company": "JobPortal Labs",
  "location": "Delhi, India",
  "type": "Full-time",
  "salary": "INR 12L - INR 18L",
  "description": "Build and maintain product features across the hiring platform.",
  "requirements": ["React experience", "Node.js experience", "MongoDB fundamentals"],
  "tags": ["React", "Node.js", "MongoDB"],
  "applyUrl": "https://example.com/apply"
}
```

## Notes

- The frontend fetches from the backend first and falls back to demo jobs if the API is empty or unavailable.
- The frontend sends live search queries to the backend and falls back to demo filtering when the API is unavailable.
- Favorites are stored in browser local storage.
