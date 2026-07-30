const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: String,
      sparse: true,
    },
    approvedAt: {
      type: Date,
      sparse: true,
    },
    rejectedBy: {
      type: String,
      sparse: true,
    },
    rejectedAt: {
      type: Date,
      sparse: true,
    },
    otp: {
      type: String,
      sparse: true,
    },
    otpExpiry: {
      type: Date,
      sparse: true,
    },
    resetOtp: {
      type: String,
      sparse: true,
    },
    resetOtpExpiry: {
      type: Date,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

async function createFirstAdmin() {
  try {
    // Load environment variables
    require('dotenv').config();

    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check if User model exists
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Check if any approved admin already exists
    const existingAdmin = await User.findOne({ approvalStatus: 'approved' });
    
    if (existingAdmin) {
      console.log('✅ An approved admin already exists:');
      console.log(`   Name: ${existingAdmin.name}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   No action needed.');
      return;
    }

    // Get admin details from command line arguments or use defaults
    const adminEmail = process.argv[2] || 'admin@squareserver.com';
    const adminName = process.argv[3] || 'System Administrator';
    const adminPassword = process.argv[4] || 'admin123456';

    console.log('\n🔧 Creating first approved admin...');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Name: ${adminName}`);

    // Check if this email already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      console.log('📧 User with this email already exists. Updating to approved status...');
      
      // Update existing user to approved status
      await User.findByIdAndUpdate(existingUser._id, {
        name: adminName,
        isVerified: true,
        approvalStatus: 'approved',
        approvedBy: 'system-setup',
        approvedAt: new Date(),
      });
      
      console.log('✅ Existing user updated to approved admin status!');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Create new approved admin
      const newAdmin = new User({
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'admin',
        isVerified: true,
        approvalStatus: 'approved',
        approvedBy: 'system-setup',
        approvedAt: new Date(),
      });

      await newAdmin.save();
      console.log('✅ First approved admin created successfully!');
    }

    console.log('\n📋 Admin Login Details:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!');
    console.log('\n🌐 You can now access the admin panel at: /admin/login');

  } catch (error) {
    console.error('❌ Error creating first admin:', error);
    process.exit(1);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the script
if (require.main === module) {
  console.log('🚀 SquareServer Admin Setup Script');
  console.log('=====================================\n');
  
  createFirstAdmin()
    .then(() => {
      console.log('\n✨ Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = createFirstAdmin;