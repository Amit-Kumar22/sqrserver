# Admin Setup Documentation

## Admin Registration & Approval System

This system implements a comprehensive admin registration and approval workflow where new admin accounts require approval from existing admins before they can access the admin panel.

### How It Works

1. **Registration**: Users can create admin accounts via `/admin/register`
2. **Email Verification**: Users must verify their email addresses
3. **Pending Approval**: After email verification, accounts remain in "pending" status
4. **Admin Approval**: Existing approved admins can approve/reject new requests
5. **Access Granted**: Only approved admins can access the admin panel

### Initial Setup

Since all admins now require approval, you need to create the first approved admin manually using the setup script:

#### Method 1: Using the Setup Script (Recommended)

```bash
# Navigate to your project directory
cd /path/to/squareserver

# Run the setup script with default values (either command works)
npm run create-first-admin
# OR
node scripts/create-first-admin.js

# Or specify custom details
node scripts/create-first-admin.js "your-email@example.com" "Your Name" "your-secure-password"
```

**Default credentials created by the script:**
- Email: `admin@squareserver.com`
- Name: `System Administrator`
- Password: `admin123456`

**⚠️ Important: Change the default password after first login!**

#### Method 2: Manual Database Update (Advanced)

If you prefer to manually update an existing user in your database:

```javascript
// In MongoDB shell or your database management tool
db.users.updateOne(
  { email: "existing-user@example.com" },
  { 
    $set: { 
      isVerified: true,
      approvalStatus: "approved",
      approvedBy: "manual-setup",
      approvedAt: new Date()
    }
  }
)
```

### Using the Admin Management System

Once you have your first approved admin:

1. **Login**: Go to `/admin/login` and sign in with the admin credentials
2. **Access Admin Management**: Navigate to "Admin Management" in the sidebar
3. **Review Requests**: View all pending admin registration requests
4. **Approve/Reject**: Click on pending requests to approve or reject them
5. **Email Notifications**: Users will receive email notifications about their approval status

### Admin Management Features

- **View All Admins**: See all admin accounts with their approval status
- **Filter by Status**: Filter by pending, approved, or rejected accounts
- **Detailed View**: Click "View Details" to see complete admin information
- **Approve/Reject**: One-click approval or rejection with email notifications
- **Audit Trail**: Track who approved/rejected each account and when

### Security Features

- **Role-based Access**: Only approved admins can access admin features
- **Email Verification**: All accounts must verify their email first
- **Approval Workflow**: Multi-step approval process prevents unauthorized access
- **Audit Logging**: Track approval actions and timestamps
- **Self-Protection**: Admins cannot approve/reject their own accounts

### Troubleshooting

#### "No admins found" message
- Run the setup script to create the first approved admin
- Check that the admin has both `isVerified: true` and `approvalStatus: "approved"`

#### Cannot login after registration
- Verify your email address first
- Wait for an existing admin to approve your account
- Check with your system administrator

#### Email verification not working
- Check your email configuration in `.env` file
- Verify SMTP settings are correct
- Check spam/junk folders

#### Setup script fails
- Ensure MongoDB is running and accessible
- Check that `MONGODB_URI` is set in your `.env` file
- Verify you have the required dependencies (`mongoose`, `bcrypt`)

### Environment Variables Required

Make sure these are set in your `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@squareserver.com
NEXTAUTH_URL=http://localhost:3000
```

### API Endpoints

- `GET /api/admin/management` - List all admin accounts
- `GET /api/admin/management?status=pending` - Filter by status
- `POST /api/admin/management/[id]` - Approve/reject specific admin

### Files Modified/Created

**New Files:**
- `src/app/admin/management/page.tsx` - Admin management interface
- `src/app/api/admin/management/route.ts` - Admin listing API
- `src/app/api/admin/management/[id]/route.ts` - Approval API
- `scripts/create-first-admin.js` - Setup script

**Modified Files:**
- `src/models/User.ts` - Added approval status fields
- `src/app/api/auth/register/route.ts` - Updated messaging
- `src/app/api/auth/login/route.ts` - Added approval checks
- `src/app/api/auth/verify/route.ts` - Added approval validation
- `src/components/admin/AdminSidebar.tsx` - Added management navigation
- `src/app/admin/register/page.tsx` - Updated UI messaging

This system provides a secure, scalable solution for managing admin access with proper approval workflows and audit trails.