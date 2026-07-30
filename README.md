# SquareServer - IT Company Website

A professional, full-stack website for SquareServer IT company built with Next.js, React, MongoDB, and Tailwind CSS. Features a comprehensive admin panel for managing projects and research content.

## 🚀 Features

### Frontend
- **Modern Design**: Clean, professional, compact UI with Tailwind CSS
- **Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Next.js 14 with App Router for optimal performance
- **SEO Friendly**: Proper meta tags and structured data

### Pages
- **Home**: Company overview with hero section, stats, and features
- **About Us**: Company information, team, and values
- **IT Solutions**: Detailed service offerings
- **Research & Development**: Published research content
- **Projects**: Dynamic project showcase with filtering
- **Project Details**: Individual project pages with full information
- **Contact**: Contact form with company information

### Admin Panel
- **Secure Authentication**: JWT-based login system
- **Dashboard**: Overview with statistics and quick actions
- **Project Management**: Full CRUD operations for projects
- **Research Management**: Manage research content and publications
- **Analytics**: Basic analytics and reporting

### Backend
- **Next.js API Routes**: Serverless backend functions
- **MongoDB Integration**: Robust database with Mongoose ODM
- **Authentication**: JWT tokens with HTTP-only cookies
- **Validation**: Comprehensive data validation and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcryptjs
- **Forms**: React Hook Form
- **UI Components**: Heroicons, React Hot Toast
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd squareserver-solution
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the `.env.local` file and update with your credentials:
   ```bash
   cp .env.local .env.local.example
   ```
   
   Update the following variables in `.env.local`:
   ```env
   # MongoDB Connection (Replace with your MongoDB Atlas connection string)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/squareserver?retryWrites=true&w=majority
   
   # JWT Secret (Generate a secure random string)
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   
   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   
   # Admin Credentials (Initial Setup)
   ADMIN_EMAIL=admin@squareserver.com
   ADMIN_PASSWORD=admin123
   ```

4. **MongoDB Setup**
   
   - Create a MongoDB Atlas account at https://www.mongodb.com/atlas
   - Create a new cluster
   - Get your connection string and replace in MONGODB_URI
   - Whitelist your IP address

5. **Initialize Database**
   ```bash
   npm run setup-db
   ```
   This will create the initial admin user and sample data.

6. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:3000 to see the website.
   Visit http://localhost:3000/admin/login to access the admin panel.

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: admin@squareserver.com
- **Password**: admin123

**⚠️ Important**: Change these credentials after first login!

### Admin Panel Features
- **Dashboard**: Overview of projects, research, and analytics
- **Projects**: Add, edit, delete, and manage project portfolio
- **Research**: Manage research content and publications
- **Analytics**: View basic statistics and insights

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── projects/          # Public project pages
│   └── ...                # Other pages
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts (Auth, etc.)
├── lib/                  # Utility functions
├── models/               # MongoDB/Mongoose models
└── types/                # TypeScript type definitions
```

## 📊 Database Schema

### Users Collection
- Authentication and admin management
- Fields: email, password, name, role, timestamps

### Projects Collection
- Project portfolio data
- Fields: title, description, detailedDescription, technologies, category, status, dates, URLs, featured

### ResearchContent Collection
- Research articles and publications
- Fields: title, content, summary, category, tags, published, author, dates

## 🔧 Configuration

### Tailwind CSS
Custom design system with:
- Professional color palette
- Compact spacing system
- Reusable utility classes
- Responsive design patterns

### Next.js Configuration
- App Router for optimal performance
- Image optimization
- API route protection
- Environment variable handling

## 📱 Features in Detail

### Project Management
- Dynamic project cards with filtering
- Individual project detail pages
- Admin CRUD operations
- Technology stack display
- Project status tracking
- Featured projects highlighting

### Research & Development
- Research content management
- Category-based organization
- Publication management
- Tag system for content discovery

### Authentication
- JWT-based secure authentication
- Protected admin routes
- Session management
- Password hashing with bcrypt

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NEXTAUTH_URL=https://yourdomain.com
```

## 🔒 Security Features

- JWT authentication with HTTP-only cookies
- Password hashing with bcryptjs
- API route protection with middleware
- Input validation and sanitization
- XSS protection
- CSRF protection

## 🎨 Design System

### Colors
- **Primary**: Blue shades for branding
- **Secondary**: Gray shades for content
- **Accent**: Red shades for alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Consistent heading and text sizes
- **Spacing**: Compact, professional spacing

### Components
- **Cards**: Subtle shadows and borders
- **Buttons**: Primary, secondary, and danger styles
- **Forms**: Consistent input styling
- **Navigation**: Clean, accessible navigation

## 📝 Development Commands

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Utilities
npm run lint         # Run ESLint
npm run setup-db     # Initialize database
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: contact@squareserver.com
- Documentation: See this README
- Issues: Create GitHub issues for bugs

## 🔄 Future Enhancements

- Blog functionality
- Email newsletter integration
- Advanced analytics
- File upload for project images
- Multi-language support
- Advanced search functionality
- SEO optimization tools
- Performance monitoring

---

**Built with ❤️ by SquareServer**# sqrserver
