# Gmail Contact Extractor

This is a Google Apps Script that extracts contact information from your Gmail contacts and emails, and creates a CSV file with the following fields: name, last name, phone, email, and domain.

## Features
- Extracts contact information from Gmail contacts and emails
- Removes duplicates and email addresses containing "noreply" or "nepasrepondre"
- Creates a CSV file with the extracted data and saves it to your Google Drive
- Logs the name of the created CSV file

## How to Use
1. Open Google Apps Script (script.google.com).
2. Click on "New Project" to create a new script.
3. Copy and paste the code from this repository into the new script file.
4. Modify the folder variable on line 44 to match the name of the folder you created in step 6.
5. Save the script file.
6. Click on the "Run" button to execute the script.
7. Grant the necessary permissions for the script to access your Gmail account and Google Drive (enable API from services).
8. Wait for the script to finish running. Once it's done, the extracted CSV file will be saved in the folder you specified in step 4.

## License
This script is released under the MIT License. See the LICENSE file for details.
