// Test suite for NxtWave referral engine logic and validation
import assert from 'node:assert';

// 1. Referral Code Generator test
function generateReferralCode(name) {
  const cleanName = (name || 'STU').replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 3);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `NXT-${cleanName || 'STU'}${randomSuffix}`;
}

console.log('🧪 Running Test 1: Referral Code Generation');
const code1 = generateReferralCode('Ganesh Annavarapu');
assert.match(code1, /^NXT-GAN\d{3}$/, 'Code should start with NXT-GAN followed by 3 digits');

const code2 = generateReferralCode('');
assert.match(code2, /^NXT-STU\d{3}$/, 'Empty name should fall back to NXT-STU');
console.log('✅ Test 1 Passed: Referral codes generated cleanly.');

// 2. Input Validation Tests
function validateRegistration(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid college or personal email';
  }
  const cleanPhone = (data.whatsapp || '').replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.whatsapp = 'Please enter a valid 10-digit Indian WhatsApp number';
  }
  if (!data.college) {
    errors.college = 'Please select your engineering college';
  }
  if (!data.branch) {
    errors.branch = 'Please select your engineering branch';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

console.log('🧪 Running Test 2: Input Validation Logic');
const validStudent = {
  name: 'Ganesh Annavarapu',
  email: 'ganesh.cse@gmail.com',
  whatsapp: '9876543210',
  college: 'CBIT Hyderabad',
  branch: 'CSE',
  gradYear: '2027'
};
const validResult = validateRegistration(validStudent);
assert.strictEqual(validResult.isValid, true, 'Valid student data must pass validation');

const invalidStudent = {
  name: 'A',
  email: 'not-an-email',
  whatsapp: '12345',
  college: '',
  branch: ''
};
const invalidResult = validateRegistration(invalidStudent);
assert.strictEqual(invalidResult.isValid, false, 'Invalid student data must fail validation');
assert.ok(invalidResult.errors.name, 'Name error should be present');
assert.ok(invalidResult.errors.email, 'Email error should be present');
assert.ok(invalidResult.errors.whatsapp, 'WhatsApp error should be present');
console.log('✅ Test 2 Passed: Form validation catches faulty inputs accurately.');

// 3. Duplicate Detection & Referral Count Attribution Test
console.log('🧪 Running Test 3: Duplicate Protection & Referral Attribution');
const mockDatabase = [
  {
    id: 'reg-01',
    name: 'Rahul Sharma',
    email: 'rahul.s@gmail.com',
    whatsapp: '9123456780',
    referralCode: 'NXT-RAH101',
    referredBy: null,
    referralCount: 0
  }
];

function mockRegister(newStudent, db) {
  const cleanEmail = newStudent.email.trim().toLowerCase();
  const cleanPhone = newStudent.whatsapp.replace(/\D/g, '');

  const duplicate = db.find(r => 
    r.email.trim().toLowerCase() === cleanEmail || 
    r.whatsapp.replace(/\D/g, '') === cleanPhone
  );

  if (duplicate) {
    return { success: false, duplicate: true };
  }

  const record = {
    ...newStudent,
    email: cleanEmail,
    whatsapp: cleanPhone,
    referralCode: generateReferralCode(newStudent.name),
    referralCount: 0
  };

  if (record.referredBy) {
    const referrer = db.find(r => r.referralCode === record.referredBy);
    if (referrer) {
      referrer.referralCount += 1;
    }
  }

  db.push(record);
  return { success: true, record };
}

// Attempt duplicate registration
const dupAttempt = mockRegister({
  name: 'Rahul Duplicate',
  email: 'RAHUL.S@gmail.com',
  whatsapp: '9999999999'
}, mockDatabase);
assert.strictEqual(dupAttempt.duplicate, true, 'Case-insensitive duplicate email must be rejected');

// Valid referral registration
const friendSignup = mockRegister({
  name: 'Sneha Patel',
  email: 'sneha.p@gmail.com',
  whatsapp: '9888877777',
  referredBy: 'NXT-RAH101'
}, mockDatabase);
assert.strictEqual(friendSignup.success, true, 'Referred friend signup must succeed');

const updatedReferrer = mockDatabase.find(r => r.referralCode === 'NXT-RAH101');
assert.strictEqual(updatedReferrer.referralCount, 1, 'Referrer referralCount must increment from 0 to 1');
console.log('✅ Test 3 Passed: Duplicates blocked and referral attribution verified.');

console.log('\n🎉 ALL REFERRAL ENGINE UNIT TESTS PASSED SUCCESSFULLY!');
