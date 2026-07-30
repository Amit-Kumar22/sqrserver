// Quick test for the contact API
const testData = {
  name: "Test User",
  email: "test@example.com", 
  company: "Test Company",
  phone: "1234567890",
  subject: "Test Subject",
  message: "This is a test message",
  projectType: "web-development",
  budget: "5k-10k"
};

async function testContactAPI() {
  try {
    console.log('🧪 Testing Contact API...');
    console.log('📝 Test data:', testData);
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    console.log('\n📊 Response Status:', response.status);
    console.log('📋 Response Data:', result);
    
    if (response.ok) {
      console.log('\n✅ SUCCESS: Contact form is working!');
      console.log('📧 Check your email at info@squareserver.in for the notification');
    } else {
      console.log('\n❌ ERROR: Contact form failed');
      console.log('🔍 Error Details:', result.error);
      if (result.details) {
        console.log('🔍 Additional Details:', result.details);
      }
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('💡 Make sure the development server is running (npm run dev)');
  }
}

// Run the test
testContactAPI();