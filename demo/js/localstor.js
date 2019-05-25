/*
    Author ZhouJT(jason_zhou05@163.com) 2016
 */

var local = window.local || {};
local.load = {
  loadJs: function(name, url, version, callback) {
    if (window.localStorage) {
      var xhr;
      var js = localStorage.getItem(name);
      if (
        js == null ||
        js.length == 0 ||
        version != localStorage.getItem(name + "version")
      ) {
        if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        }
        if (xhr != null) {
          xhr.open("GET", url);
          xhr.send(null);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              js = xhr.responseText;
              localStorage.setItem(name, js);
              localStorage.setItem(name + "version", version);
              js = js == null ? "" : js;
              local.load.writeJs(js);
              if (xhr.readystate == "loaded" || xhr.readState == "complate") {
                if (callback != null) {
                  callback();
                }
              }
            }
          };
        }
      } else {
        local.load.writeJs(js);
        if (callback != null) {
          callback();
        }
      }
    } else {
      local.load.linkJs(url);
    }
  },
  loadCss: function(name, url, version) {
    if (window.localStorage) {
      var xhr;
      var css = localStorage.getItem(name);
      if (
        css == null ||
        css.length == 0 ||
        version != localStorage.getItem(name + "version")
      ) {
        if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        }
        if (xhr != null) {
          xhr.open("GET", url);
          xhr.send(null);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              css = xhr.responseText;
              localStorage.setItem(name, css);
              localStorage.setItem(name + "version", version);
              css = css == null ? "" : css;
              local.load.writeCss(css);
            }
          };
        }
      } else {
        local.load.writeCss(css);
      }
    } else {
      local.load.linkCss(url);
    }
  },

  writeJs: function(text) {
    var head = document.getElementsByTagName("HEAD").item(0);
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.innerHTML = text;
    head.appendChild(link);
  },

  writeCss: function(text) {
    var head = document.getElementsByTagName("HEAD").item(0);
    var link = document.createElement("style");
    link.type = "text/css";
    link.innerHTML = text;
    head.appendChild(link);
  },

  linkJs: function(url) {
    var head = document.getElementsByTagName("HEAD").item(0);
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.src = url;
    head.appendChild(link);
  },

  linkCss: function(url) {
    var head = document.getElementsByTagName("HEAD").item(0);
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.rev = "stylesheet";
    link.media = "screen";
    link.href = url;
    head.appendChild(link);
  }
};
