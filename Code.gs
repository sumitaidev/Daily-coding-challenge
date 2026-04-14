function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Submissions");
  
  // Parse the incoming JSON data
  const data = JSON.parse(e.postData.contents);
  
  // Generate Unique Form ID
  const formId = "ID-" + new Date().getTime().toString().slice(-5) + Math.random().toString(36).substring(2, 5).toUpperCase();
  
  try {
    // Append to Sheet
    sheet.appendRow([
      new Date(), 
      formId, 
      data.userName, 
      data.userEmail, 
      data.knowledgeArea
    ]);
    
    // 1. Send Confirmation to User
   // Define your links
    const courseUrl = "https://gyanloop.com/latest-course"; // Replace with your actual course link
    const youtubeVideoUrl = "https://www.youtube.com/watch?v=Vxw0nE1qfZc"; // Replace with your video link
    const videoThumbnail = "https://img.youtube.com/vi/Vxw0nE1qfZc/maxresdefault.jpg"; // Replace YOUR_VIDEO_ID

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #007bff; text-align: center;">Submission Confirmed!</h2>
        <p>Hi <b>${data.userName}</b>,</p>
        <p>Thank you for participating in our <b>Knowledge Assessment Survey</b>. Your contribution helps us shape the future of technical education at Gyanloop.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #007bff; margin: 20px 0; text-align: center;">
          <span style="font-size: 1.1em;">Your Unique ID:</span><br>
          <strong style="font-size: 1.5em; color: #007bff;">${formId}</strong>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee;">

        <div style="text-align: center; padding: 10px 0;">
          <h3 style="margin-bottom: 10px;">Ready to Level Up?</h3>
          <p>Don't miss out on our latest <b>AI & Data Science Masterclass</b>. Registration is now open!</p>
          <a href="${courseUrl}" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Register for Latest Course</a>
        </div>

        <div style="text-align: center; margin-top: 25px;">
          <p><b>Check out our latest tutorial:</b></p>
          <a href="${youtubeVideoUrl}">
            <img src="${videoThumbnail}" alt="Watch Video" style="width: 100%; max-width: 400px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
          </a>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;">

        <div style="text-align: center; padding-top: 10px;">
          <p style="margin-bottom: 15px; font-weight: bold;">Follow us for more updates:</p>
          <a href="https://linkedin.com/in/yourprofile"><img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" width="32" style="margin: 0 10px;"></a>
          <a href="https://github.com/yourusername"><img src="https://cdn-icons-png.flaticon.com/32/733/733553.png" width="32" style="margin: 0 10px;"></a>
          <a href="https://youtube.com/yourchannel"><img src="https://cdn-icons-png.flaticon.com/32/1384/1384060.png" width="32" style="margin: 0 10px;"></a>
          <a href="https://twitter.com/yourhandle"><img src="https://cdn-icons-png.flaticon.com/32/733/733579.png" width="32" style="margin: 0 10px;"></a>
        </div>

        <p style="font-size: 0.8em; color: #777; text-align: center; margin-top: 30px;">
          Best regards,<br><b>The Gyanloop Team</b>
        </p>
      </div>
    `;

    MailApp.sendEmail({
      to: data.userEmail,
      subject: "Survey Confirmation & Next Steps - ID: " + formId,
      htmlBody: htmlBody
    });
    
    // 2. Send Notification to YOU (Hardcoded to avoid "no recipient" error)
    // Replace 'your-email@gmail.com' with your actual email address
    const myEmail = "hello.sumithaldar@gmail.com"; 
    
    MailApp.sendEmail({
      to: myEmail,
      subject: "New Survey Entry: " + data.userName,
      body: `You received a new response.\n\nName: ${data.userName}\nEmail: ${data.userEmail}\nKnowledge: ${data.knowledgeArea}\nForm ID: ${formId}`
    });

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "formId": formId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
