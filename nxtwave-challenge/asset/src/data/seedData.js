// Realistic demo simulation dataset for video demonstration
// Clearly labeled in UI as [SIMULATION DEMO DATA]

export const SEED_AMBASSADORS = [
  { code: "AMB-CBIT-SAI", name: "Sai Kumar (CBIT Hyderabad)", college: "CBIT - Chaitanya Bharathi Institute of Technology, Hyderabad", target: 40 },
  { code: "AMB-VNR-DIVYA", name: "Divya Reddy (VNR VJIET)", college: "VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad", target: 35 },
  { code: "AMB-GVP-ADITYA", name: "Aditya Manepalli (GVPCE Vizag)", college: "GVPCE - Gayatri Vidya Parishad College of Engineering, Visakhapatnam", target: 35 },
  { code: "AMB-VRSEC-POOJA", name: "Pooja Krishna (VRSEC Vijayawada)", college: "VRSEC - Velagapudi Ramakrishna Siddhartha Engineering College, Vijayawada", target: 30 },
  { code: "AMB-BMS-RAHUL", name: "Rahul S. (BMSCE Bangalore)", college: "BMS College of Engineering, Bangalore", target: 30 },
  { code: "AMB-SRKR-PAVAN", name: "Pavan Varma (SRKR Bhimavaram)", college: "SRKR Engineering College, Bhimavaram", target: 25 },
  { code: "AMB-DSCE-NEHA", name: "Neha Sharma (DSCE Bangalore)", college: "Dayananda Sagar College of Engineering (DSCE), Bangalore", target: 25 },
  { code: "AMB-VITP-ROHAN", name: "Rohan Deshmukh (VIT Pune)", college: "VIT - Vishwakarma Institute of Technology, Pune", target: 25 },
];

export function generateSeedRegistrations() {
  const registrations = [];
  const firstNames = ["Ananya", "Karthik", "Sneha", "Rohit", "Meghana", "Varun", "Priyanka", "Teja", "Harshitha", "Nikhil", "Bhavya", "Manoj", "Aravind", "Swathi", "Venkatesh", "Deepika", "Suresh", "Charan", "Akhila", "Kavya", "Abhishek", "Sravani", "Praneeth", "Tarun", "Siddharth", "Tanvi", "Rakesh", "Keerthi", "Dinesh", "Sanjay"];
  const lastNames = ["Rao", "Reddy", "Sharma", "Varma", "Chowdary", "Gupta", "Nair", "Patel", "Kulkarni", "Deshmukh", "Iyer", "Kumar", "Singh", "Joshi", "Babu", "Naidu", "Prasad", "Verma", "Shetty", "Das"];
  
  const colleges = [
    "CBIT - Chaitanya Bharathi Institute of Technology, Hyderabad",
    "VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad",
    "GVPCE - Gayatri Vidya Parishad College of Engineering, Visakhapatnam",
    "VRSEC - Velagapudi Ramakrishna Siddhartha Engineering College, Vijayawada",
    "BMS College of Engineering, Bangalore",
    "SRKR Engineering College, Bhimavaram",
    "Dayananda Sagar College of Engineering (DSCE), Bangalore",
    "Vasavi College of Engineering, Hyderabad",
    "VIT - Vishwakarma Institute of Technology, Pune",
    "PSG College of Technology, Coimbatore"
  ];

  const branches = [
    "Computer Science & Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics & Communication Engineering (ECE)",
    "Electrical & Electronics Engineering (EEE)",
    "Artificial Intelligence & Data Science (AI & DS)"
  ];

  // Daily target distributions across days 1 to 5 (currently simulated at Day 5: ~340 total)
  const dayDistribution = [
    { day: 1, count: 35, dateStr: "2026-10-01" },
    { day: 2, count: 72, dateStr: "2026-10-02" },
    { day: 3, count: 98, dateStr: "2026-10-03" },
    { day: 4, count: 82, dateStr: "2026-10-04" },
    { day: 5, count: 48, dateStr: "2026-10-05" } // Today in progress
  ];

  let idCounter = 1001;
  const createdCodes = [];

  dayDistribution.forEach(({ day, count, dateStr }) => {
    for (let i = 0; i < count; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${fn} ${ln}`;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 900 + 100)}@gmail.com`;
      const phone = `9${Math.floor(Math.random() * 900000000 + 100000000)}`;
      const college = colleges[Math.floor(Math.random() * colleges.length)];
      const branch = branches[Math.floor(Math.random() * branches.length)];
      const myCode = `NXT-${fn.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
      
      // Determine acquisition channel
      let utmSource = "ambassador_whatsapp";
      let referredBy = "";
      const rand = Math.random();

      if (rand < 0.44) {
        utmSource = "ambassador_whatsapp";
        const amb = SEED_AMBASSADORS[Math.floor(Math.random() * SEED_AMBASSADORS.length)];
        referredBy = amb.code;
      } else if (rand < 0.74 && createdCodes.length > 5) {
        utmSource = "peer_referral";
        referredBy = createdCodes[Math.floor(Math.random() * createdCodes.length)];
      } else if (rand < 0.90) {
        utmSource = "college_circular";
        referredBy = "HOD_NOTICE";
      } else {
        utmSource = "meta_instagram_ad";
        referredBy = "AD_BOOST";
      }

      // Generate realistic hour
      const hour = Math.floor(Math.random() * 14 + 9); // between 9 AM and 11 PM
      const minute = Math.floor(Math.random() * 60);
      const createdAt = `${dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`;

      createdCodes.push(myCode);

      registrations.push({
        id: `reg-${idCounter++}`,
        name,
        email,
        whatsapp: phone,
        college,
        branch,
        gradYear: "2025 (Final Year / Passing Out)",
        referralCode: myCode,
        referredBy: referredBy || null,
        referralCount: 0,
        utmSource,
        createdAt,
        isDemo: true
      });
    }
  });

  // Calculate referral counts
  const countMap = {};
  registrations.forEach(r => {
    if (r.referredBy) {
      countMap[r.referredBy] = (countMap[r.referredBy] || 0) + 1;
    }
  });

  registrations.forEach(r => {
    r.referralCount = countMap[r.referralCode] || 0;
  });

  return registrations;
}
