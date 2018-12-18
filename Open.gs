function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities')
  .addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2'))
//  .addItem('New Day', 'duplicate')
  .addItem('Add CA', 'addCA')
  .addItem('Fresh Up', 'fresh')
  .addItem('Skip CA', 'skip')
  .addItem('30 Out', 'thirtyOut').addToUi();
  ss.setActiveSheet(ss.getSheets()[3]);
  var sheetDate = new Date();
  sheetDate = (sheetDate.getMonth() + 1) + '/' + sheetDate.getDate();
  ss.setActiveSheet(ss.getSheetByName(sheetDate));
}

function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}

function menuItem2() {
  //Created By Kennen Lawrence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email The Spreadsheet Guy','Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    MailApp.sendEmail('kennen.lawrence@a2zsync.com','HELP Up List 2018',input.getResponseText(),{name:getName()});
  } else if (input.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('User cancelled');
  }
}

function getName(){
  //Created By Kennen Lawrence
  //Version 1.01
  var email = Session.getActiveUser().getEmail();
  var name, first, last;
  name = email.split("@schomp.com");
  name=name[0];
  name=name.split(".");
  first=name[0];
  last=name[1];
  first= first[0].toUpperCase() + first.substring(1);
  last=last[0].toUpperCase() + last.substring(1);
  name=first+" "+last;
  return name;
}
