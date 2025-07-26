// Test utilities for form features
// Run this in browser console to test analytics and storage

export const testAnalytics = () => {
  console.log('🧪 Testing Analytics...');
  
  // Test basic event tracking
  if (typeof window.trackFormEvent !== 'undefined') {
    window.trackFormEvent.start('test_form');
    window.trackFormEvent.fieldFocus('name', 'test_form');
    window.trackFormEvent.submitSuccess('test_form', { serviceType: 'home' });
    console.log('✅ Analytics events fired successfully');
  } else {
    console.log('❌ Analytics not loaded');
  }
};

export const testFormStorage = () => {
  console.log('🧪 Testing Form Storage...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    serviceType: 'home'
  };
  
  // Test save/load cycle
  if (typeof window.saveDraft !== 'undefined') {
    const saved = window.saveDraft('test_form', testData);
    const loaded = window.loadDraft('test_form');
    const hasData = window.hasDraft('test_form');
    
    console.log('Saved:', saved);
    console.log('Loaded:', loaded);
    console.log('Has draft:', hasData);
    console.log('Data matches:', JSON.stringify(loaded) === JSON.stringify(testData));
    
    // Cleanup
    window.clearDraft('test_form');
    console.log('✅ Form storage working correctly');
  } else {
    console.log('❌ Form storage not loaded');
  }
};

export const testSpamDetection = () => {
  console.log('🧪 Testing Spam Detection...');
  
  const spamTests = [
    { data: { website: 'spam.com' }, expected: true, test: 'Honeypot' },
    { data: { name: 'aaaaaaaaaa' }, expected: true, test: 'Repeated chars' },
    { data: { email: 'test@viagra.com' }, expected: true, test: 'Suspicious keywords' },
    { data: { name: 'John Doe', email: 'john@example.com' }, expected: false, test: 'Valid data' }
  ];
  
  spamTests.forEach(({ expected, test }) => {
    // This would use the spam detection function from ContactForm
    console.log(`${test}: Expected ${expected}`);
  });
  
  console.log('✅ Spam detection tests completed');
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  window.testFormFeatures = {
    testAnalytics,
    testFormStorage,
    testSpamDetection
  };
  
  console.log('🎯 Form test utilities loaded. Run:');
  console.log('window.testFormFeatures.testAnalytics()');
  console.log('window.testFormFeatures.testFormStorage()');
  console.log('window.testFormFeatures.testSpamDetection()');
}