(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["login_url"] = "${login_url}";
    window["env"]["parameters_service"] = "${parameters_service}";
    window["env"]["user_service"] = "${user_service}";
    window["env"]["production"] = true;
  })(this);