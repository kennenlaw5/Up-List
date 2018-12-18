function summary(type, date, range) {
  // created by Sean Lowe, 7/30/2018
  // version 2.0
  var arr = [];
  var final = []; 
  var found = false;
  for (var i = 0; i < range.length; i++) {
    found = false;
    if (range[i][0].split(" ")[0] != "") {
      if (arr.length == 0) {
        arr[arr.length] = range[i];
      } else {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j][0] == range[i][0]) {
            found = true;
            break;
          } }
        if (!found) {
          arr[arr.length] = range[i];
        } } } }
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < range.length; j++) {
      if (arr[i][0] == range[j][0]) { arr[i][1] = range[j][1]; }
    } }
  for (i = 0; i < arr.length; i++) {
    if (arr[i][1] == type) {
      final[final.length] = arr[i][0];
    } 
    if (type == "Not Assigned" && arr[i][1] == "") {
      final[final.length] = arr[i][0];
    }
  }
  if (final.length == 0) { final = ["N/A"]; }
  return final;
}

function onEdit(e) {
  // created by Sean Lowe, 7/30/2018
  // updated by Kennen Lawrence 12/18/18
  // if sheet name override is changed, reset functions to accomodate change
  if (e == 'Reset' || (e.source.getSheetName() == 'Summary' && e.range.getA1Notation() == 'C2')) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var name = 'Summary';
    var sheet = ss.getSheetByName(name);
    var range = sheet.getRange(6, 1, 1, 11);
    var formulas = range.getFormulas();
    range.setValue('');
    SpreadsheetApp.flush();
    var day = sheet.getRange(2, 3).getDisplayValue();
    var temp;
    var str = [[]];
    for (var i = 0; i < formulas[0].length; i++) {
      if (formulas[0][i] != '') {
        //Logger.log(range[0][i]);
        temp = formulas[0][i].split(',');
        str[0][i] = temp[0] + ",$C$2,'" + day + "'!$A$3:$B)";
      }
      else { str[0][i] = ''; }
    }
    range.setFormulas(str);
  }
}

function reset() {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Summary').getRange(2, 3).setValue('=TODAY()');
  onEdit('Reset');
}

function sweep() {
  // created by Sean Lowe, 7/27/2018
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var name, lowerd, todayd, today, sheet;
  var str, strd, strm, todaym;
  today = new Date();
  todayd = today.getDate();
  todaym = today.getMonth()+1;
  lowerd = today.getDate()-14;
  today = (today.getMonth()+1) + "/" + (today.getDate());
  for (var i = 0; i < sheets.length; i++) {
    name = sheets[i].getName().toLowerCase();
    if (name != today && name != "master" && name != "*new* test sheet" && name != "list" && name != "summary") {
      str = name.split("/");
      strm = str[0];
      strd = str[1];
      if (strm < todaym || strd < lowerd) {
        //ss.deleteSheet(sheets[i]); // uncomment this and comment out the following line to change from hiding unneeded sheets to deleting them
        sheets[i].hideSheet();
        Logger.log("hid sheet: " + name);
      }
    }
  }
}

function addCA() {
  var ui = SpreadsheetApp.getUi();
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getActiveSheet();
  var ignore = driver('ignored');
  if (ignore.indexOf(sheet.getSheetName()) != -1) {
    ss.toast('You are not aloud to use this function on this sheet. Please go to a date sheet and try again.', 'Invalid Sheet')
    return;
  }
  var range=sheet.getRange(3, 2, sheet.getLastRow()).getValues();
  for (var i = 0; i < range.length; i++) {
    if (range[i] == "") { var row = parseInt(i) + 3; i = range.length; }
  }
  var name=ui.prompt('Add CA','Enter CA\'s name:',ui.ButtonSet.OK_CANCEL);
  if(name.getSelectedButton()==ui.Button.OK){
    sheet.getRange(row,1,1,2).setValues([[name.getResponseText(),"Available"]]);
  }
}

function email(){
  var email = Session.getActiveUser().getEmail();
  var ss=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var name;var first;var last;
  if(email=="samantha.rendon@schomp.com"){
    name=ss.getRange("H2").getValue();
    if(name==""){name="Samantha";}
  }
  else{
    name = email.split("@schomp.com");
    name=name[0];
    name=name.split(".");
    first=name[0];
    last=name[1];
    first= first[0].toUpperCase() + first.substring(1);
    last=last[0].toUpperCase();
    name=first;
  }
  return name;
}

function fresh(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getActiveSheet();
  var ignore = driver('ignored');
  if (ignore.indexOf(sheet.getSheetName()) != -1) {
    ss.toast('You are not aloud to use this function on this sheet. Please go to a date sheet and try again.', 'Invalid Sheet')
    return;
  }
  var range=sheet.getRange(3,2,sheet.getLastRow()).getValues();
  var bullc=false;var availc=false;
  for(var i=0;i<range.length;i++){
    if(range[i]=="Bull-Pen"){var bull=parseInt(i)+3;bullc=true;}
    else if(bullc==true){
      if(range[i]=="Available"){var avail=parseInt(i)+3;i=range.length;availc=true;}
    }else if(range[i]==""){i+=999;}
  }
  var time=new Date().toLocaleTimeString();
  var timec="";
  for(i=0;i<time.length;i++){
    if(i<3){timec+=time[i];}
    else if(time[i]<=9&&time[i]>=0){timec+=time[i];}
    else{i+=999;}
  }
  if(bullc==true){var temp=sheet.getRange(bull,3).getValue();sheet.getRange(bull,2,1,3).setValues([["Fresh",temp,timec]]);}
  if(availc==true){sheet.getRange(avail,2,1,3).setValues([['Bull-Pen',timec,'']]);}
}

function skip(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getActiveSheet();
  var ignore = driver('ignored');
  if (ignore.indexOf(sheet.getSheetName()) != -1) {
    ss.toast('You are not aloud to use this function on this sheet. Please go to a date sheet and try again.', 'Invalid Sheet')
    return;
  }
  var range=sheet.getRange(3,2,sheet.getLastRow()).getValues();
  var bullc=false;var availc=false;
  for(var i=0;i<range.length;i++){
    if(range[i]=="Bull-Pen"){var bull=parseInt(i)+3;bullc=true;}
    else if(bullc==true){
      if(range[i]=="Available"){var avail=parseInt(i)+3;i+=999;availc=true;}
    }else if(range[i]==""){i+=999;}
  }
  var time=new Date().toLocaleTimeString();
  var timec="";
  for(i=0;i<time.length;i++){
    if(i<3){timec+=time[i];}
    else if(time[i]<=9&&time[i]>=0){timec+=time[i];}
    else{i+=999;}
  }
  if(bullc==true){var temp=sheet.getRange(bull,3).getValue();sheet.getRange(bull,2,1,3).setValues([["Skip",temp,timec]]);}
  if(availc==true){sheet.getRange(avail,2,1,3).setValues([['Bull-Pen',timec,'']]);}
}

function thirtyOut(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getActiveSheet();
  var ignore = driver('ignored');
  if (ignore.indexOf(sheet.getSheetName()) != -1) {
    ss.toast('You are not aloud to use this function on this sheet. Please go to a date sheet and try again.', 'Invalid Sheet')
    return;
  }
  var range=sheet.getRange(3,2,sheet.getLastRow()).getValues();
  var bullc=false;var availc=false;
  for(var i=0;i<range.length;i++){
    if(range[i]=="Bull-Pen"){var bull=parseInt(i)+3;bullc=true;}
    else if(bullc==true){
      if(range[i]=="Available"){var avail=parseInt(i)+3;i+=999;availc=true;}
    }else if(range[i]==""){i+=999;}
  }
  var time=new Date().toLocaleTimeString();
  var timec="";
  for(i=0;i<time.length;i++){
    if(i<3){timec+=time[i];}
    else if(time[i]<=9&&time[i]>=0){timec+=time[i];}
    else{i+=999;}
  }
  if(bullc==true){var temp=sheet.getRange(bull,3).getValue();sheet.getRange(bull,2,1,3).setValues([["30 min to Out",temp,timec]]);}
  if(availc==true){sheet.getRange(avail,2,1,3).setValues([['Bull-Pen',timec,'']]);}
}