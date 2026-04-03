# 🐾 Zovena — Pet Wellness Management Platform

Zovena is a mobile-first, role-based pet wellness platform that digitizes pet healthcare. It connects pet owners and veterinarians through a secure, centralized system — enabling pet profile management, medical record tracking, and role-based access control.

Live Demo: [https://zovena.netlify.app](https://zovena.netlify.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + TypeScript |
| Styling | Tailwind CSS |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| Deployment | Netlify |
| Build Tool | Vite |

> Supabase serves as the backend-as-a-service, handling authentication, database operations, file storage, and Row Level Security — replacing the need for a custom Node.js + Express server.

---

## Features

### Authentication
- Email and password signup and login
- Role selection on signup — Pet Owner or Veterinarian
- Session persistence across page refreshes
- Protected routes based on user role

### Pet Profiles
- Pet owners can create, edit, and delete pet profiles
- Fields include name, species, age (years and months), and photo
- Pet photos uploaded to Supabase Storage
- Veterinarians can view all pets across all owners in read-only mode

### Role-Based Access Control
- Pet Owners — manage their own pets only
- Veterinarians — view all registered pets with owner details
- Access enforced at the database level using Supabase Row Level Security (RLS) policies

### UI/UX
- Mobile-first responsive design
- Custom Zovena brand color palette
- Navbar with role badge and sign out
- Footer with copyright on every page
- Custom logo and favicon

---

## Database Schema

### profiles
| Column | Type | Description |
|---|---|---|
| id | uuid | References auth.users |
| email | text | User email |
| role | text | owner or vet |
| created_at | timestamptz | Signup timestamp |

### pets
| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | Pet name |
| species | text | Pet species |
| age_years | integer | Age in years |
| age_months | integer | Age in months |
| photo_url | text | Supabase Storage URL |
| owner_id | uuid | References profiles |
| created_at | timestamptz | Creation timestamp |

---

## Security

- Row Level Security (RLS) enabled on all tables
- Owners can only access their own pets
- Veterinarians have read-only access to all pets
- Authentication handled by Supabase Auth with JWT sessions

---

## Local Development

### Prerequisites
- Node.js 18+
- A Supabase project

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/zovena.git
cd zovena
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

This project is deployed on Netlify. To deploy your own instance:

1. Push the repository to GitHub
2. Connect the repository to Netlify
3. Set the build command to `npm run build` and publish directory to `dist`
4. Add your Supabase environment variables in Netlify's environment settings
5. Deploy

---

## Product Roadmap

| Phase | Features |
|---|---|
| MVP | Authentication, pet profiles, role-based access |
| V1 | Medical records, audit logs |
| V2 | Push notifications, vaccine reminders |
| V3 | Analytics dashboard |
| V4 | AI health recommendations, native mobile app |

---

## Author

**Joanne Costo**
© 2026 Joanne Costo. All rights reserved.