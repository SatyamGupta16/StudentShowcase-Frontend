# 🚀 Student Project Showcase — Frontend

> A modern, responsive, and production-ready frontend for showcasing student profiles, projects, creations, portfolios, and achievements.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

---

## ✨ Overview

**Student Project Showcase** is a beautifully crafted frontend platform built to highlight the practical work of students.

It allows visitors, parents, admins, and students to explore:

- 👨‍🎓 Student profiles
- 💻 Technical projects
- 🎨 Creative works
- 🧠 Skills and portfolios
- ⭐ Featured showcase content
- 🔐 Role-based dashboards

This frontend is built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and a clean service-based architecture for API communication.

---

## 🧠 Project Idea

Most student work gets hidden inside folders, laptops, or classroom submissions.

This platform turns that work into a **public digital showcase**.

Instead of only saying:

> “Our students learn coding.”

This platform shows:

> “Here are the real projects our students built.”

That makes it perfect for:

- Coaching institutes
- Computer classes
- College departments
- Portfolio showcases
- Hackathon teams
- Student communities

---

## 🎯 Key Features

### 🌍 Public Showcase

Visitors can explore public pages without login.

- View all students
- View student profile details
- Browse projects
- Browse creations/products
- View featured content
- Explore live demo and GitHub links

---

### 🔐 Authentication Flow

The frontend supports authentication-based UI flow.

- Login
- Register
- Token storage
- Protected dashboard routes
- Role-based redirection

Roles supported:

```txt
admin
student
```

---

### 🛡️ Admin Dashboard

Admin gets a powerful dashboard to manage showcase content.

Admin can:

- View total students
- View total projects
- View total creations
- Add students
- Manage users
- Add projects
- Manage projects
- Add creations
- Manage creations
- View recent entries
- Logout securely

---

### 👨‍🎓 Student Dashboard

Student gets a clean personal dashboard.

Student can:

- View account details
- Open public profile
- Explore projects
- Explore creations
- Browse other students
- Logout securely

---

### 🖼️ Image Support

The frontend supports uploaded images from the backend.

Used for:

- Profile photos
- Project screenshots
- Product/creation thumbnails

Image URLs are dynamically generated using backend environment variables.

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling |
| **Axios** | API requests |
| **Next Image** | Optimized image rendering |
| **LocalStorage** | Token and user persistence |
| **ESLint** | Code quality |

---

## 📁 Frontend Folder Structure

```txt
student-project-showcase/
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   └── student/
│   │   │
│   │   ├── login/
│   │   ├── register/
│   │   │
│   │   ├── users/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │
│   │   ├── projects/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │
│   │   ├── products/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │
│   │   ├── showcase/
│   │   │   ├── users/
│   │   │   │   └── [id]/
│   │   │   ├── projects/
│   │   │   │   └── [id]/
│   │   │   └── products/
│   │   │       └── [id]/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── projectService.ts
│   │   └── productService.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── project.ts
│   │   └── product.ts
│   │
│   └── utils/
│       └── storage.ts
│
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of the frontend project.

```env
NEXT_PUBLIC_API_URL=http://localhost:27017/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:27017
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-project-showcase.git
```

### 2. Go to Project Folder

```bash
cd student-project-showcase
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment Variables

Create `.env.local` and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:27017/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:27017
```

### 5. Run Development Server

```bash
npm run dev
```

Now open:

```txt
http://localhost:3000
```

---

## 🧪 Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Checks code quality and linting issues.

---

## 🔗 Frontend Routes

### Public Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/login` | Login page |
| `/register` | Register page |
| `/showcase/users` | Public student showcase |
| `/showcase/users/[id]` | Public student profile |
| `/showcase/projects` | Public project showcase |
| `/showcase/projects/[id]` | Public project details |
| `/showcase/products` | Public creation showcase |
| `/showcase/products/[id]` | Public creation details |

---

### Admin Routes

| Route | Description |
|---|---|
| `/dashboard/admin` | Admin dashboard |
| `/dashboard` | Main dashboard |
| `/users` | Manage users/students |
| `/users/create` | Add user/student |
| `/users/[id]` | Edit user/student |
| `/projects` | Manage projects |
| `/projects/create` | Add project |
| `/projects/[id]` | Edit project |
| `/products` | Manage creations |
| `/products/create` | Add creation |
| `/products/[id]` | Edit creation |

---

### Student Routes

| Route | Description |
|---|---|
| `/dashboard/student` | Student dashboard |
| `/showcase/users/[id]` | Student public profile |

---

## 🧩 API Integration

This frontend communicates with the backend using Axios.

API instance:

```ts
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:27017/api",
});
```

Service-based API structure:

```txt
authService.ts
userService.ts
projectService.ts
productService.ts
```

This keeps API logic clean, reusable, and easy to maintain.

---

## 🔐 Role-Based Flow

After login:

```txt
Admin   → /dashboard/admin
Student → /dashboard/student
```

Unauthorized users are redirected to:

```txt
/login
```

This keeps dashboards protected and role-specific.

---

## 🖼️ Screenshots

Add your screenshots here:

```md
![Home Page](./public/screenshots/home.png)
![Admin Dashboard](./public/screenshots/admin-dashboard.png)
![Student Dashboard](./public/screenshots/student-dashboard.png)
![Project Showcase](./public/screenshots/projects.png)
```

Recommended folder:

```txt
public/screenshots/
```

---

## 🌟 UI Highlights

- Clean landing page
- Responsive layouts
- Beautiful dashboard cards
- Featured project sections
- Public profile pages
- Smooth hover effects
- Modern Tailwind styling
- Mobile-friendly design
- Admin and student separation
- Real project portfolio experience

---

## 🧠 What Makes This Project Special?

This is not just another CRUD frontend.

It is a **student achievement engine**.

It helps students convert their learning into visible proof.

Every project becomes:

- a portfolio item
- a confidence booster
- a showcase asset
- a learning milestone
- a public achievement

That is the real value.

---

## 🛠️ Build Status

Current frontend status:

```txt
Development: Complete
Authentication: Complete
Admin Dashboard: Complete
Student Dashboard: Complete
Public Showcase: Complete
API Integration: Complete
Production Build: Passing
```

---

## 🚀 Deployment

This frontend can be deployed on:

- Vercel
- Netlify
- Render Static Site

Recommended platform:

```txt
Vercel
```

### Vercel Environment Variables

Add these in Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

Then deploy.

---

## 🧑‍💻 Author

Built with passion by:

```txt
Satyam Gupta
B.Tech CSE Student
Full-Stack Developer
```

---

## 💡 Future Improvements

Planned upgrades:

- Search and filter students
- Search and filter projects
- Student self-project upload
- Admin analytics dashboard
- Dark mode
- Better image cropping
- Public share buttons
- Certificate showcase
- GitHub contribution stats
- AI-powered project review

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

Fork the repository, create a branch, make changes, and open a pull request.

```bash
git checkout -b feature/your-feature-name
```

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Final Note

This frontend is built to make student work visible, searchable, and impressive.

Because great projects should not stay hidden in folders.

They deserve a stage.