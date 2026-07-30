# 📧 Email Setup Guide - SquareServer Contact Form

## 🔧 Setup Instructions

### Step 1: Configure Email Password

1. **Edit `.env.local` file**
   - Replace `YOUR_ACTUAL_EMAIL_PASSWORD_HERE` with your actual Hostinger email password
   - This should be the password for `info@squareserver.in`

```bash
EMAIL_PASS=your_real_password_here
```

### Step 2: Verify SMTP Settings

Current Hostinger configuration (already set):
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=info@squareserver.in
EMAIL_FROM=info@squareserver.in
CONTACT_EMAIL_RECEIVER=info@squareserver.in
```

### Step 3: Test Email Configuration

Before using the contact form, test your email setup:

**Option A: Using VS Code REST Client**
```http
POST http://localhost:3000/api/test-email
```

**Option B: Using curl in terminal**
```bash
curl -X POST http://localhost:3000/api/test-email
```

**Option C: Using browser**
- Visit: http://localhost:3000/api/test-email (GET request to check config)

### Step 4: Check Test Results

✅ **If successful, you should see:**
- "Email configuration test successful!"
- Check your `info@squareserver.in` inbox for test email

❌ **If failed, check:**
- Email password is correct
- All environment variables are set
- Hostinger email service is active
- No firewall blocking SMTP port 587

## 🐛 Debugging Common Issues

### Issue 1: "Authentication failed"
- **Cause:** Wrong email password
- **Fix:** Update `EMAIL_PASS` in `.env.local` with correct password

### Issue 2: "Connection timeout"
- **Cause:** Firewall or network blocking SMTP
- **Fix:** Check firewall settings, try different network

### Issue 3: "Invalid credentials"
- **Cause:** Email account not properly configured with Hostinger
- **Fix:** Verify email account exists and SMTP is enabled

### Issue 4: Email goes to spam
- **Cause:** SMTP reputation or email content
- **Fix:** Check spam/junk folder, whitelist sender

## 🔍 Testing Commands

### Test email configuration:
```bash
# In project directory
cd D:\web_project\SquareServer

# Start development server
npm run dev

# In new terminal, test email
curl -X POST http://localhost:3000/api/test-email
```

### Check environment variables:
```bash
curl http://localhost:3000/api/test-email
```

## ✅ What Was Fixed

1. **API Error Handling:** Contact form now fails properly if email sending fails
2. **Environment Variables:** Cleaned up duplicate SMTP settings
3. **Email Configuration:** Added proper validation and timeout settings
4. **Debug Logging:** Added detailed logs to track email sending process
5. **Test Endpoint:** Created `/api/test-email` for configuration testing

## 📝 Important Notes

- **Security:** Never commit real passwords to Git
- **Testing:** Always test email before going live
- **Monitoring:** Check server logs for email errors
- **Backup:** Keep alternative contact methods (phone) available

## 🚀 Production Checklist

- [ ] Set real email password in `.env.local`
- [ ] Test email configuration using test endpoint
- [ ] Verify emails arrive in inbox (not spam)
- [ ] Test contact form end-to-end
- [ ] Monitor logs for any errors
- [ ] Have backup contact method ready

---

**Need Help?** 
- Check server console logs for detailed error messages
- Test using `/api/test-email` endpoint first
- Verify Hostinger email account settings