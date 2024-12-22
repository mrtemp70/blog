
This script automates the process of submitting responses to a Google Form by fetching data from a Google Sheets spreadsheet and sending it to the specified form URL.

---

#### **Google Form URL (replace with the actual form link):**

```
https://docs.google.com/forms/d/e/XXXXXXXXX/formResponse?&pageHistory=0  // Replace XXXXXX with your actual form link
```

#### **Form Fields Mapping:**

1. **Name**: entry.1247112151
2. **Old**: entry.1569449727
3. **Profession**: entry.864751571
4. **Gender**: entry.906904739
5. **Live**: entry.297897678
6. **Visually Impaired**: entry.1413387780
7. **Seen**: entry.832391978
8. **Heard**: entry.1205250277
9. **Easy to Carry**: entry.514569674
10. **More Modern**: entry.124549323
11. **Carry**: entry.281605032
12. **Features**: entry.2087512712
13. **Cost**: entry.710162451
14. **Independently**: entry.1908303585
15. **Optional**: entry.1570098263

#### **Script:**

```javascript
function autoEntry() {
  var wrkBk = SpreadsheetApp.getActiveSpreadsheet();
  var wrkSht = wrkBk.getSheetByName("Sheet1");

  var formURL = ""; // Replace with the actual form URL
  var formData = "";

  var fname = "";
  var old = "";
  var prof = "";
  var gender = "";
  var live = "";
  var vis_imp = "";
  var seen = "";
  var heard = "";
  var easy = "";
  var mordern = "";
  var carry = "";
  var feature = "";
  var cost = "";
  var inde = "";
  var opt = "";

  var noOfRows = 4; // Update with the number of rows you want to process

  for (i = 2; i <= noOfRows; i++) {
    fname = wrkSht.getRange("A" + i).getDisplayValue();
    old = wrkSht.getRange("B" + i).getDisplayValue();
    prof = wrkSht.getRange("C" + i).getDisplayValue();
    gender = wrkSht.getRange("D" + i).getDisplayValue();
    live = wrkSht.getRange("E" + i).getDisplayValue();
    vis_imp = wrkSht.getRange("F" + i).getDisplayValue();
    seen = wrkSht.getRange("G" + i).getDisplayValue();
    heard = wrkSht.getRange("H" + i).getDisplayValue();
    easy = wrkSht.getRange("I" + i).getDisplayValue();
    mordern = wrkSht.getRange("J" + i).getDisplayValue();
    carry = wrkSht.getRange("K" + i).getDisplayValue();
    feature = wrkSht.getRange("L" + i).getDisplayValue();
    cost = wrkSht.getRange("M" + i).getDisplayValue();
    inde = wrkSht.getRange("N" + i).getDisplayValue();
    opt = wrkSht.getRange("O" + i).getDisplayValue();
    
    formURL = "https://docs.google.com/forms/d/e/1FAIpQLScAodEl2AFm-RpAZ4kFhA2Rh1iC4SVU3q8FDPNsA9kWfDKGMQ/formResponse?&pageHistory=0";

    formData = "&entry.1247112151=" + fname + 
               "&entry.1569449727=" + old + 
               "&entry.864751571=" + prof + 
               "&entry.906904739=" + gender + 
               "&entry.297897678=" + live + 
               "&entry.1413387780=" + vis_imp + 
               "&entry.832391978=" + seen + 
               "&entry.1205250277=" + heard + 
               "&entry.514569674=" + easy + 
               "&entry.124549323=" + mordern + 
               "&entry.281605032=" + carry + 
               "&entry.2087512712=" + feature + 
               "&entry.710162451=" + cost + 
               "&entry.1908303585=" + inde + 
               "&entry.1570098263=" + opt;

    var finalURL = formURL + formData;

    var options = {
      "method": "post"
    };

    UrlFetchApp.fetch(finalURL, options);
  }
}
```

---

### **Explanation**:

1. **Spreadsheet Data Fetching**:
    
    - The script fetches data from rows in the Google Sheets file (`wrkSht`).
    - It gets the values for various form fields like Name, Profession, Gender, etc.
2. **Form URL and Data Construction**:
    
    - The script constructs the URL with the appropriate form responses using query parameters (i.e., `entry.<ID>`).
3. **Submit Data to Google Form**:
    
    - Using `UrlFetchApp.fetch()`, the form data is submitted to the Google Form URL.

---

### **How to Use**:

- Replace the `formURL` with the actual URL of your Google Form.
- Modify the `noOfRows` variable to match the number of rows in your Google Sheet that you want to process.
- Run the script to automatically submit the data from your Google Sheet to the Google Form.
