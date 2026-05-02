# 🗓️ Event Planner (Full Stack MERN + Next.js App)

A modern **event management web application** where users can create events, share invite links, and track RSVPs — built with a clean **neumorphic UI**.

---

## 🚀 Features

### 👤 Authentication

* Secure login/signup using Neon Auth
* Session-based authentication (JWT + cookies)
* Protected routes (dashboard, events)

---

### 📅 Event Management

* Create events with:

  * Title
  * Description
  * Location
  * Date & Time
* View all your events in a dashboard
* Clean, neumorphic UI design

---

### 🔗 Invite System

* Generate unique invite links
* Share link with guests (no login required)
* Each event has its own secure token

---

### 📊 RSVP Tracking

Guests can respond with:

* ✅ Going
* 🤔 Maybe
* ❌ Not Going

Host can:

* See counts for each category
* Track responses in real-time

---

### 🎨 UI / UX

* White **Neumorphism-based design**
* Soft shadows, inset inputs, modern layout
* Smooth user experience with clean interactions

---

## 🧠 Tech Stack

### 🖥️ Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* shadcn/ui

---

### ⚙️ Backend

* Node.js
* Server Actions (Next.js)
* Prisma ORM

---

### 🗄️ Database

* PostgreSQL

---

### 🔐 Authentication

* Neon Auth

---

## 📂 Project Structure

```
app/
 ├── auth/              # Sign in / Sign up pages
 ├── dashboard/         # User dashboard
 ├── events/
 │    ├── new/          # Create event
 │    ├── [eventId]/    # Event details
 ├── invite/
 │    ├── [token]/      # RSVP page

components/
 ├── ui/                # Reusable UI (shadcn)
 ├── dashboard-content  # Dashboard logic
 ├── event-detail       # Event details UI

lib/
 ├── auth/              # Auth config
 ├── prisma/            # DB client
 ├── actions/           # Server actions (CRUD)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/event-planner.git
cd event-planner
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create `.env` file:

```env
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_AUTH_URL=your_neon_auth_url
```

---

### 4️⃣ Setup database

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5️⃣ Run the project

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User signs up / logs in
2. Session stored in cookies
3. Protected routes checked via middleware
4. Unauthorized users → redirected to login

---

## 📊 RSVP Flow

1. Host creates event
2. Generates invite link
3. Guest opens link
4. Submits RSVP
5. Data stored in database
6. Dashboard updates counts

---

## 🧾 Database Schema Overview

### Event

* id
* title
* description
* location
* eventDate
* ownerUserId

---

### EventInvite

* token
* eventId

---

### EventRsvp

* name
* email
* status (going / maybe / not_going)

---

## ⚡ Key Concepts Used

### 🧩 Server Actions

* Used for:

  * Creating events
  * RSVP submission
  * Invite generation

---

### 🔒 Middleware Protection

* Protects:

  * `/dashboard`
  * `/events`
* Skips auth for server actions (important fix)

---

### 🎯 Neumorphism Design

* Cards → raised shadows
* Inputs → inset shadows
* Buttons → soft elevation

---

## 🐞 Common Issues & Fixes

### ❌ Hydration Error

Fix:

```tsx
<html suppressHydrationWarning>
```

---

### ❌ Server Action Error

Cause:

* Auth middleware blocking POST

Fix:

```ts
if (isServerActionPost(request)) return NextResponse.next();
```

---

### ❌ Neon UI Styling Issues

Fix:

* Override styles in `globals.css`
* Wrap components in neumorphic containers

---

## 🚀 Future Improvements

* Custom authentication UI (replace AuthView)
* Email notifications
* Calendar integration
* Mobile responsiveness improvements
* Admin analytics dashboard

---

## 📌 Author

**Ram (Ramvishwajithin)**
Full Stack Developer 🚀

---

## ⭐ Support

If you like this project:

* Star ⭐ the repo
* Share with others
* Contribute improvements

---

## 📜 License

This project is open-source and free to use.

