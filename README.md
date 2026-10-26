## Daily LeetCode Email Reminder

A lightweight, serverless Google Apps Script that automatically fetches the daily coding challenge from LeetCode and sends it directly to your email inbox every morning.

Features

Zero Maintenance & Free: Runs entirely on Google Apps Script (no external servers or cloud hosting fees).

Rich Content: Includes the problem title, difficulty level, full HTML description, and test case examples right in the email body.

Direct Integration: Features a styled "Solve on LeetCode" button that redirects you straight to the daily problem.

Automated: Uses Apps Script Time-driven triggers to deliver the email at your preferred time every day.

Prerequisites

A Google Account (Gmail)

No coding experience required for setup

Setup Instructions

1. Create the Script

Go to Google Apps Script and click New Project.

Name the project (e.g., "LeetCode Daily Reminder").

Delete the default myFunction() code in the editor.

Copy the JavaScript code from this project and paste it into the editor.

In the code, locate the targetEmail variable and replace YOUR_EMAIL@gmail.com with your actual email address.

2. Test and Authorize

Click the Save icon (floppy disk) in the toolbar.

Click the Run button at the top.

Google will prompt you to authorize the script.

Click Review permissions.

Select your Google Account.

Click Advanced at the bottom, then click Go to [Your Project Name] (unsafe).

Click Allow to grant the script permission to send emails on your behalf.

Check your email inbox. You should have received today's LeetCode problem!

3. Automate the Daily Email (Trigger)

In the Apps Script editor, click the Triggers icon (it looks like an alarm clock) on the left sidebar.

Click the + Add Trigger button in the bottom right corner.

Configure the trigger with the following settings:

Choose which function to run: sendDailyLeetCodeEmail

Choose which deployment should run: Head

Select event source: Time-driven

Select type of time based trigger: Day timer

Select time of day: Choose your preferred delivery window (e.g., 8am to 9am).

Click Save.

Customization

Styling: You can modify the CSS inside the htmlBody variable to match your personal aesthetic preferences.

Multiple Recipients: If you want to send this to a group of friends, you can change the targetEmail string to a comma-separated list of emails (e.g., "email1@gmail.com, email2@gmail.com").

Disclaimer

This project uses LeetCode's public GraphQL API. It is an independent project and is not affiliated with, maintained, or endorsed by LeetCode.
