# Email System Setup Guide

## Overview
Your contact form system is now configured to send emails to **info@squareserver.in** using a secure SMTP setup with nodemailer.

## ✅ Current Implementation

### Features Included:
- **Admin Notification Email**: When users submit the contact form, you receive a formatted email with all form details
- **Customer Confirmation Email**: Users get an automatic confirmation email acknowledging their submission  
- **Professional Email Templates**: Both emails are formatted with your branding and complete information
- **Security**: Email credentials are stored in environment variables (not exposed in frontend code)
- **Error Handling**: Proper error messages for both success and failure scenarios

### Email Template Includes:
**Admin Notification Email:**
- Contact Information (Name, Email, Phone, Company)
- Project Details (Subject, Project Type, Budget Range)
- Complete message content
- Timestamp in IST timezone

**Customer Confirmation Email:**
- Professional SquareServer branding
- Submission summary
- Next steps information
- Contact information for follow-up

## 🔧 Required Setup Steps

### 1. Configure Email Credentials
You need to update the `.env.local` file with your actual email credentials:

```env
# Update this with your actual email password
EMAIL_PASS=your_actual_email_password_here
```

### 2. Email Server Configuration Options

#### Option A: Hostinger SMTP (Recommended - Already Configured)
If info@squareserver.in is hosted with Hostinger, the current configuration should work:
- Host: smtp.hostinger.com
- Port: 587  
- Secure: false (STARTTLS)

#### Option B: Gmail SMTP (Alternative)
If using Gmail, update these settings in `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=info@squareserver.in
EMAIL_PASS=your_app_password_here
```

#### Option C: Other Email Providers
For other providers, update the SMTP settings accordingly.

### 3. Test the System

#### Test Contact Form:
1. Start the development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your inbox at info@squareserver.in

#### Expected Behavior:
- ✅ User sees success message: "Message sent successfully! We'll get back to you soon."
- ✅ You receive admin notification email with form details
- ✅ User receives confirmation email at their provided address
- ❌ If email fails, user sees: "Failed to send message. Please try again."

## 🔒 Security Features

### Environment Variables (Secure):
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email password (never exposed to frontend)
- `EMAIL_FROM`: Sender email address
- `CONTACT_EMAIL_RECEIVER`: Where contact emails are sent

### Security Best Practices:
- ✅ Email credentials are server-side only
- ✅ Frontend never has access to email passwords
- ✅ SMTP uses STARTTLS encryption
- ✅ Input validation on form fields
- ✅ Error handling prevents credential exposure

## 🚀 API Endpoint Details

### Endpoint: `/api/contact`
- **Method**: POST
- **Content-Type**: application/json

### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "company": "Tech Corp",
  "phone": "9876543210",
  "subject": "Web Development Project", 
  "message": "I need a website for my business",
  "projectType": "web-development",
  "budget": "5k-10k"
}
```

### Response (Success):
```json
{
  "message": "Message sent successfully! We will get back to you within 24 hours.",
  "data": { ...formData, "id": "timestamp" }
}
```

### Response (Error):
```json
{
  "error": "Failed to submit contact form. Please try again."
}
```

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Email Not Sending
- Check if `EMAIL_PASS` is set correctly in `.env.local`
- Verify SMTP settings match your email provider
- Check server logs for detailed error messages

#### 2. Authentication Errors
- Ensure email password is correct
- For Gmail, use App Password (not regular password)
- Check if 2FA is enabled on the email account

#### 3. Form Submission Issues  
- Check browser console for JavaScript errors
- Verify API endpoint is accessible at `/api/contact`
- Check if toast notifications are working

### Debug Commands:
```bash
# Check if environment variables are loaded
npm run dev

# Check API route directly
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message","projectType":"web-development"}'
```

## 📧 Email Provider Setup Instructions

### For Hostinger:
1. Log into your Hostinger control panel
2. Go to Email section → Email Accounts
3. Find info@squareserver.in and note the password
4. Update `.env.local` with the password

### For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password (not regular password)  
3. Use App Password in `EMAIL_PASS`

### For other providers:
Check their SMTP settings documentation and update the configuration accordingly.

## 🎯 Next Steps

1. **Update Email Password**: Set the correct password in `.env.local`
2. **Test Thoroughly**: Submit test contact forms and verify email delivery
3. **Monitor Logs**: Check server logs during initial testing
4. **Optional Enhancements**:
   - Add CAPTCHA for spam protection
   - Set up email templates in external service
   - Add email analytics/tracking
   - Implement contact form spam filtering

Your contact form system is now ready to securely send all user messages directly to info@squareserver.in! 🚀