/*

function summary() {
  // created by Sean Lowe, 7/30/2018
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sum = ss.getSheetByName("Summary BETA");
  var override = sum.getRange(2, 5).getValue();
  var temp, today, orig, filt;
  var na = []; var vid = []; var appt = []; var fre = []; var min30 = [];
  var skip = []; var lun = []; var off = []; var aval = []; var bp = []; var wth = [];
  filt = [];
  //Logger.log(override);
  if (override != undefined && override != "") {
    //Logger.log("override is not empty");
    today = override;
  } else {
    temp = new Date();
    today = (temp.getMonth()+1) + "/" + temp.getDate();
    //Logger.log(today);
  }
  orig = ss.getSheetByName(today).getRange(3, 2, ss.getSheetByName(today).getLastRow()-2, 2).getValues();
  for (var i = 0; i < orig.length; i++) {
    filt[filt.length] = [];
    for (var j = 0; j < filt.length; j++) {
      //Logger.log("filt["+j+"][0]="+filt[j][0] +"     orig["+i+"][0]="+orig[i][0]);
      if (filt[j][0] != undefined && (filt[j][0].toLowerCase() == orig[i][0].toLowerCase())) {
        Logger.log(filt.indexOf(filt[j][0]));
        if (filt.indexOf(filt[j][0]) != -1) {
          filt[filt.indexOf(filt[j][0])-1][1] = orig[i][1];
          filt.splice(j, 1);
        }
        break;
      } else {
        filt[filt.length-1][0] = orig[i][0];
        filt[filt.length-1][1] = orig[i][1];
      }
    }
  }
  //Logger.log(filt);
  for (i = 0; i < filt.length; i++) {
    switch(filt[i][1]) {
      case "Video":
        vid[vid.length] = [];
        vid[vid.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Appt":
        appt[appt.length] = [];
        appt[appt.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Fresh":
        fre[fre.length] = [];
        fre[fre.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "30 min to Out":
        min30[min30.length] = [];
        min30[min30.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Skip":
        skip[skip.length] = [];
        skip[skip.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Lunch":
        lun[lun.length] = [];
        lun[lun.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "OFF":
        off[off.length] = [];
        off[off.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Available":
        aval[aval.length] = [];
        aval[aval.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "Bull-Pen":
        bp[bp.length] = [];
        bp[bp.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      case "With":
        wth[wth.length] = [];
        wth[wth.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
      default: // not assigned
        na[na.length] = [];
        na[na.length -1] = [filt[i][0]];
        filt.splice(i, 1); i--;
        break;
    }
  }
  Logger.log("na="+na);
  Logger.log("vid="+vid);
  Logger.log("appt="+appt);
  Logger.log("fresh="+fre);
  Logger.log("30 min="+min30);
  Logger.log("skip="+skip);
  Logger.log("lunch="+lun);
  Logger.log("off="+off);
  Logger.log("aval="+aval);
  Logger.log("bp="+bp);
  Logger.log("with="+wth);
}


*/