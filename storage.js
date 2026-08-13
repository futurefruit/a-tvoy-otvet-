"use strict";

/* ==========================================================================
   window.storage — лёгкая обёртка для хранения настроек между визитами.

   Намеренно НЕ localStorage: реализация держится на cookies, но остальной
   код обращается только к window.storage.getItem/setItem/removeItem —
   такой же интерфейс, как у Storage (localStorage/sessionStorage). Если
   транспорт понадобится сменить (например, на серверную синхронизацию
   настроек), это делается в одном файле, не трогая логику игры.
   ========================================================================== */

(function () {
  var COOKIE_MAX_AGE_DAYS = 365;

  function setCookie(name, value, days) {
    var maxAge = days * 24 * 60 * 60; // в секундах
    var encoded = encodeURIComponent(value);
    document.cookie = name + "=" + encoded + "; max-age=" + maxAge + "; path=/; samesite=lax";
  }

  function getCookie(name) {
    var target = name + "=";
    var parts = document.cookie ? document.cookie.split(";") : [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();
      if (part.indexOf(target) === 0) {
        return decodeURIComponent(part.slice(target.length));
      }
    }
    return null;
  }

  function removeCookie(name) {
    document.cookie = name + "=; max-age=0; path=/; samesite=lax";
  }

  window.storage = {
    getItem: getCookie,
    setItem: function (name, value) {
      setCookie(name, value, COOKIE_MAX_AGE_DAYS);
    },
    removeItem: removeCookie,
  };
})();
