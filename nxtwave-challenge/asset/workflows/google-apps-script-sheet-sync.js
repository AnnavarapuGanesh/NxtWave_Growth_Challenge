/**
 * Google Apps Script Webhook Endpoint for NxtWave Workshop Registrations
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Paste this code into Code.gs
 * 4. Click Deploy > New Deployment > Web App (Execute as Me, Who has access: Anyone)
 * 5. Copy the Web App URL and paste it into VITE_GOOGLE_SHEETS_WEBHOOK_URL in .env
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Student ID",
        "Full Name",
        "Email",
        "WhatsApp",
        "College",
        "Branch",
        "Graduation Year",
        "Referral Code",
        "Referred By",
        "UTM Source"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Append student row
    sheet.appendRow([
      new Date(),
      data.id || "",
      data.name || "",
      data.email || "",
      "'" + (data.whatsapp || ""),
      data.college || "",
      data.branch || "",
      data.gradYear || "",
      data.referralCode || "",
      data.referredBy || "",
      data.utmSource || "direct"
    ]);

    // Optional: send automated email receipt
    if (data.email) {
      try {
        MailApp.sendEmail({
          to: data.email,
          subject: "Your Ticket: Build Your First AI Project in 60 Minutes (NxtWave)",
          htmlBody: "<p>Hi " + data.name + ",</p>" +
                    "<p>Your registration is confirmed! Your personal referral link is:</p>" +
                    "<p><a href='https://nxtwave-ai-workshop.vercel.app?ref=" + data.referralCode + "'>" +
                    "https://nxtwave-ai-workshop.vercel.app?ref=" + data.referralCode + "</a></p>" +
                    "<p>Invite 3 batchmates to unlock the <b>VIP AI Project Pack</b>!</p>" +
                    "<p>- Team NxtWave</p>"
        });
      } catch (mailErr) {
        Logger.log("Email dispatch failed: " + mailErr);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
