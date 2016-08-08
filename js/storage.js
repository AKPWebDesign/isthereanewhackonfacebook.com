var Storage = function() {}

Storage.prototype.set = function (k, v, e) {
  if(typeof(Storage) !== 'undefined') {
    return localStorage.setItem(k, v);
  } else {
    return cookieSet(k, v, e);
  }
};

Storage.prototype.get = function (k) {
  if(typeof(Storage) !== 'undefined') {
    return localStorage.getItem(k);
  } else {
    return cookieGet(k);
  }
};

Storage.prototype.delete = function (k) {
  if(typeof(Storage) !== 'undefined') {
    return localStorage.removeItem(k);
  } else {
    return cookieRemove(k);
  }
};

/**
 * Sets a new cookie.
 * @param  {String} key      The key to use for this cookie.
 * @param  {String} value    The value of this cookie.
 * @param  {String} expires  Optional. The expires time.
 */
function cookieSet(key, value, expires) {
  if(!expires) {expires = 'Fri, 31 Dec 9999 23:59:59 GMT';}
  document.cookie = key + '=' + value + '; expires=' + expires;
}

/**
 * Gets the value of a cookie.
 * @param  {String} key The key to look up.
 * @return {String}     The value of the cookie.
 */
function cookieGet(key) {
  var re = new RexExp(key + '=([^;]+)');
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

/**
 * Removes a cookie.
 * @param  {String} key The cookie to remove.
 */
function cookieRemove(key) {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
