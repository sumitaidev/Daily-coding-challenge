function sendDailyLeetCodeEmail() {
  // 1. Fetch the daily problem, including the "content" (description & examples)
  var url = "https://leetcode.com/graphql";
  var query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        link
        question {
          title
          difficulty
          content
        }
      }
    }
  `;

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({ "query": query })
  };

  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  var challenge = data.data.activeDailyCodingChallengeQuestion;

  var title = challenge.question.title;
  var difficulty = challenge.question.difficulty;
  var content = challenge.question.content; // Contains HTML description and examples
  var link = "https://leetcode.com" + challenge.link;

  // 2. Configure the email
  var targetEmail = "YOUR_EMAIL@gmail.com"; 
  var subject = "Daily Coding Challenge: " + title;
  
  var htmlBody = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; padding: 30px; border-radius: 8px;">
            <h2 style="color: #333; text-align: center; margin-bottom: 5px;">${title}</h2>
            <p style="color: #666; font-size: 15px; text-align: center; margin-top: 0;"><strong>Difficulty:</strong> ${difficulty}</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <!-- Problem Description & Examples from LeetCode -->
            <div style="color: #222; font-size: 15px; line-height: 1.6;">
                ${content}
            </div>
            
            <br>
            <div style="text-align: center; margin-top: 20px;">
                <a href="${link}" 
                   style="background-color: #ffa116; color: #000000; padding: 12px 24px; 
                          text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                   Solve on LeetCode
                </a>
            </div>
        </div>
      </body>
    </html>
  `;

  // 3. Send the email
  MailApp.sendEmail({
    to: targetEmail,
    subject: subject,
    htmlBody: htmlBody
  });
}
