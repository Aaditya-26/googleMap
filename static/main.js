function DirectionsToggle() {
    var el = $('#dir-toggle');
    var dir_table = $('#dir-table')
    if (dir_table.attr("hidden") == "hidden") {
      dir_table.fadeIn();
      dir_table.removeAttr("hidden");
      el.html('hide <a href="javascript:void(0)" onclick="DirectionsToggle()">here</a>');
    } else {
      dir_table.fadeOut();
      dir_table.attr("hidden", "hidden");
      el.html('click <a href="javascript:void(0)" onclick="DirectionsToggle()">here</a>');
    }
  }
  
  function ShowAlert(title, message, type, redirect) {
    // Ensure type is valid
    var validTypes = ['success', 'error', 'info', 'warning'];
    if (!validTypes.includes(type)) {
      console.error('Invalid toastr type:', type);
      type = 'info'; // Default to info if invalid type
    }
    
    console.log('ShowAlert called with:', { title, message, type, redirect }); // Debugging output
  
    if (redirect) {
      toastr[type](message, title, {
        positionClass: 'toast-bottom-right',
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
        timeOut: 7500,
        onHidden: function () {
          window.location.assign(redirect);
        }
      });
    } else {
      toastr[type](message, title, {
        positionClass: 'toast-bottom-right',
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
        timeOut: 7500,
      });
    }
  }
  
  function showPword() {
    var x = document.getElementsByClassName("password");
    for (let i = 0; i < x.length; i++) {
      if (x[i].type === "password") {
        x[i].type = "text";
      } else {
        x[i].type = "password";
      }
    }
  }
  
  var temp_button_text;
  
  function CustomFormSubmitPost(e) {
    var el = $(e);
    temp_button_text = el.text();
    el.attr('disabled', 'disabled').text("").append('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...');
  }
  
  function CustomFormSubmitResponse(e) {
    var el = $(e);
    el.removeAttr('disabled').text(temp_button_text);
  }
  
  "use strict";
  var FormControls = function () {
  
    var usersignup = function () {
      var form = $('#signupform');
      form.submit(function (event) {
        event.preventDefault();
        CustomFormSubmitPost($('#signupform button[type=submit]'));
  
        grecaptcha.ready(function () {
          grecaptcha.execute(recaptcha_site_key, { action: "/" }).then(function (token) {
            document.getElementById('id_token').value = token;
            var formdata = form.serialize();
  
            $.ajax({
              url: form.attr("action"),
              method: form.attr("method"),
              data: formdata,
              success: function (json) {
                CustomFormSubmitResponse($('#signupform button[type=submit]'));
                var type = json["result"].toLowerCase();
                console.log('AJAX success - type:', type); // Debugging output
                var redirect = (json["result"] == "Success") ? "/" : false;
                ShowAlert(json["result"], json["message"], type, redirect);
              },
              error: function (xhr) {
                CustomFormSubmitResponse($('#signupform button[type=submit]'));
                ShowAlert("Error", "There was an error, please try again", "error", false);
                console.log(xhr.status + ": " + xhr.responseText);
              }
            });
          });
        });
      });
    };
  
    var usersignin = function () {
      var form = $('#signinform');
      form.submit(function (event) {
        event.preventDefault();
        CustomFormSubmitPost($('#signinform button[type=submit]'));
        var formdata = form.serialize();
  
        $.ajax({
          url: form.attr("action"),
          method: form.attr("method"),
          data: formdata,
          success: function (json) {
            CustomFormSubmitResponse($('#signinform button[type=submit]'));
            var type = json["result"].toLowerCase();
            console.log('AJAX success - type:', type); // Debugging output
            var redirect = (json["result"] == "Success") ? "/" : false;
            ShowAlert(json["result"], json["message"], type, redirect);
          },
          error: function (xhr) {
            CustomFormSubmitResponse($('#signinform button[type=submit]'));
            ShowAlert("Error", "There was an error, please try again", "error", false);
            console.log(xhr.status + ": " + xhr.responseText);
          }
        });
      });
    };
  
    var userprofile = function () {
      var form = $('#profileform');
      form.submit(function (event) {
        event.preventDefault();
        CustomFormSubmitPost($('#profileform button[type=submit]'));
        var formdata = form.serialize();
  
        $.ajax({
          url: form.attr("action"),
          method: form.attr("method"),
          data: formdata,
          success: function (json) {
            CustomFormSubmitResponse($('#profileform button[type=submit]'));
            var type = json["result"].toLowerCase();
            console.log('AJAX success - type:', type); // Debugging output
            var redirect = (json["result"] == "Success") ? "/" : false;
            ShowAlert(json["result"], json["message"], type, redirect);
          },
          error: function (xhr) {
            CustomFormSubmitResponse($('#profileform button[type=submit]'));
            ShowAlert("Error", "There was an error, please try again", "error", false);
            console.log(xhr.status + ": " + xhr.responseText);
          }
        });
      });
    };
  
    return {
      init: function () {
        usersignup();
        usersignin();
        userprofile();
      }
    };
  }();
  
  jQuery(document).ready(function () {
    FormControls.init();
  });
  
  $(function () {
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
      var host = document.location.host;
      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin;
      return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        !(/^(\/\/|http:|https:).*/.test(url));
    }
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      }
    });
  });
  