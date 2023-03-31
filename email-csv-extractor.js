function extractContactInfo() {
  var csvContent = "Name,Last Name,Phone,Email,Domain\n"; // header row for CSV file
  var emailSet = new Set(); // to keep track of unique email addresses

  // Extract contact information from Gmail Contacts
  var contacts = ContactsApp.getContacts();
  for (var i = 0; i < contacts.length; i++) {
    var firstName = contacts[i].getGivenName() || "";
    var lastName = contacts[i].getFamilyName() || "";
    var phone = "";
    if (contacts[i].getPhones().length > 0) {
      phone = contacts[i].getPhones()[0].getPhoneNumber() || "";
    }
    var emails = contacts[i].getEmails();
    if (emails.length > 0) {
      for (var j = 0; j < emails.length; j++) {
        var extractedEmail = emails[j].getAddress();
        if (extractedEmail && !emailSet.has(extractedEmail) && !/noreply|nepasrepondre/i.test(extractedEmail)) {
          csvContent += '"' + firstName.replace(/"/g, '""') + '","' + lastName.replace(/"/g, '""') + '","' + phone.replace(/"/g, '""') + '","' + extractedEmail + '","' + extractedEmail.split("@")[1] + '"\n';
          emailSet.add(extractedEmail);
        }
      }
    }
  }

  // Extract contact information from Gmail emails
  var threads = GmailApp.search("");
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var email = messages[j].getFrom();
      if (email) {
        var extractedEmails = email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        for (var k = 0; k < extractedEmails.length; k++) {
          var extractedEmail = extractedEmails[k];
          if (!emailSet.has(extractedEmail) && !/noreply|nepasrepondre/i.test(extractedEmail)) {
            var senderName = messages[j].getFrom().match(/(.*)<(.*)>/) || [];
            var firstName = senderName[1] ? senderName[1].trim().split(" ")[0] : "";
            var lastName = senderName[1] ? senderName[1].trim().split(" ").slice(1).join(" ") : "";
            csvContent += '"' + firstName.replace(/"/g, '""') + '","' + lastName.replace(/"/g, '""') + '","","' + extractedEmail + '","' + extractedEmail.split("@")[1] + '"\n';
            emailSet.add(extractedEmail);
          }
        }
      }
    }
  }

  // Create CSV file in Google Drive
  var folder = DriveApp.getRootFolder(); // change as needed
  var fileName = "extracted_emails.csv";
  var file = folder.createFile(fileName, csvContent, MimeType.CSV);

  Logger.log("CSV file created with name " + fileName);
}
