function duplicate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var master = ss.getSheetByName('MASTER');
  var sheetDate, month, day;
  var check = false;
  var manualOverride = false;
  
  while (!check && manualOverride) {
    check = true;
    sheetDate = ui.prompt('Enter Date', 'Please enter the date in the format of M/D.'+
                          '\nFor consistency do not place a leading "0" on months or days less than 10.', ui.ButtonSet.OK_CANCEL);
    if (sheetDate.getSelectedButton() == ui.Button.CANCEL) { return; }
    sheetDate = sheetDate.getResponseText().replace('-','/');
    if (sheetDate.indexOf('/') == -1) { 
      ui.alert('Format Error:'
               ,'You have entered the date in an incorrect format. The month and day must be sepparated by a "/". Please try again with the correct format.'
               ,ui.ButtonSet.OK);
      check = false;
    } else {
      month = sheetDate.split('/')[0];
      day = sheetDate.split('/')[1];
      Logger.log(parseInt(month, 10) + ' ' + parseInt(day, 10));
      if (!isNaN(parseInt(month, 10)) && month.length > 1 && parseInt(month, 10) < 10 && month.indexOf('0') != -1) {
        month = month.replace('0','');
      }
      if (!isNaN(parseInt(day, 10)) && month.length > 1 && parseInt(day, 10) < 10 && day.indexOf('0') != -1) {
        day = day.replace('0','');
      }
      if (isNaN(parseInt(month, 10)) || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        ui.alert('Bad Month', 'The month must be a valid month between 1 and 12. You\'re entry of "'+month+'" is not valid. Please Try again.', ui.ButtonSet.OK);
        check = false;
      }
      if (isNaN(parseInt(day, 10)) || parseInt(day, 10) < 1 || parseInt(day, 10) > 12) {
        ui.alert('Bad Day', 'The day must be a valid day between 1 and 31. Your entry of "'+day+'" is not valid. Please Try again.', ui.ButtonSet.OK);
        check = false;
      }
    }
  }
  if (manualOverride) { sheetDate = month + '/' + day; }
  else {
    sheetDate = new Date();
    sheetDate = (sheetDate.getMonth() + 1) + '/' + sheetDate.getDate();
  }
  ss.setActiveSheet(master.copyTo(ss).setName(sheetDate))
  ss.moveActiveSheet(4);
}
