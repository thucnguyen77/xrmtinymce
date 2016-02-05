 tinymce.init({
    selector: '#crmhtmleditor',
    height: 300,
    max_height: 300,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table contextmenu paste code'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    setup : function(ed) {
            ed.on('blur',function(e) {
                    var content = tinyMCE.activeEditor.getContent();

                    var field = parent.Xrm.Page.getAttribute(_fieldName);
                    var maxLength = field.getMaxLength();

                    // If the fields max length is exceeded display an error
                    if (value.length > maxLength) {
                      parent.Xrm.Utility.alertDialog("You have exceeded the maximum number of " + maxLength + " characters in this field");
                    }

                    // Set the value, even if max length is exceeded to allow CRM validation to kick in on save
                    field.setValue(value);
            });
          }
  });

var _qs = getQueryStrings();
var _fieldName = getQueryString("field");

 $(document).ready(function () {

          // Get the existing value from the form (field must be on the form, hidden etc)
          var field = parent.Xrm.Page.getAttribute(_fieldName);
          var htmlValue = field.getValue();

          // Populate the HTML editor with the existing value from the form
          document.getElementById('crmhtmleditor').value = htmlValue;
          
        });



// Get the value of a specific querystring
function getQueryString(key) {
  var value = "";

  if (_qs != null) {
    for (var i in _qs) {
      if (_qs[i][0].toLowerCase() == key) {
        value = _qs[i][1];
        break;
      }
    }
  }

  return value;
}

function getQueryStrings() {
  var qs = null;

  if (location.search != "") {
      // Get all the query strings
      var qs = location.search.substr(1).split("&");
      for (var i in qs) {
          qs[i] = qs[i].replace(/\+/g, " ").split("=");
      }

      // Look for the parameter named 'data' (contains all our custom qs's)
      var data = "";
      for (var i in qs) {
          if (qs[i][0].toLowerCase() == "data") {
              data = qs[i][1];
              break;
          }
      }

      // Get all of our query strings
      if (data != "") {
          var vals = decodeURIComponent(data).split("&");
          for (var i in vals) {
              vals[i] = vals[i].replace(/\+/g, " ").split("=");
          }

          qs = vals;
      }
  }

  return qs;
}
