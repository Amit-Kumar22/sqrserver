# MongoDB Setup Instructions

## To Enable Full CRUD Functionality

The website currently works without a database, but to add/edit/delete projects through the Admin Panel, you need to set up MongoDB.

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/squareserver?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:
   - Windows: `net start mongodb`
   - Mac: `brew services start mongodb`
   - Linux: `sudo systemctl start mongod`
3. The current configuration should work: `mongodb://localhost:27017/squareserver`

## After Setup

1. Restart the development server: `npm run dev`
2. Go to Admin Panel: `http://localhost:3002/admin/login`
3. Login with: `admin@squareserver.com` / `admin123`
4. Start adding projects!

## Without Database

The website works fine without database - it just shows "No projects found" until you set up MongoDB and add projects through the Admin Panel.