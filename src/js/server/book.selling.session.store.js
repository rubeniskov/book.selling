(function( bs ){
    
 "use strict";
/*!
 * Connect - session - Store
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils         = bs.utils,

    EventEmitter  = require('events').EventEmitter,

    util          = require('util'),

    Session       = function Session( req, data ) 
{
    Object.defineProperty(this, 'req', { value: req });
    
    Object.defineProperty(this, 'id', { value: req.sessionID });
    
    this.maxAge = data.maxAge;

    if (data) utils.merge(this, data);

    this.originalMaxAge = typeof this.originalMaxAge === 'undefined'
      ? this.maxAge
      : this.originalMaxAge;

    if(this.maxAge) this.expires = new Date(Date.now() + this.maxAge);
};

Session.prototype = {
/**
   * Set expires `date`.
   *
   * @param {Date} date
   * @api public
   */
  
  set expires(date) {
    this._expires = date;
    this.originalMaxAge = this.maxAge;
  },

  /**
   * Get expires `date`.
   *
   * @return {Date}
   * @api public
   */

  get expires() {
    return this._expires;
  },
  
  /**
   * Set expires via max-age in `ms`.
   *
   * @param {Number} ms
   * @api public
   */
  
  set maxAge(ms) {
    this.expires = 'number' == typeof ms
      ? new Date(Date.now() + ms)
      : ms;
  },

  /**
   * Get expires max-age in `ms`.
   *
   * @return {Number}
   * @api public
   */

  get maxAge() {
    return this.expires instanceof Date
      ? this.expires.valueOf() - Date.now()
      : this.expires;
  },

  /**
   * Update reset `.cookie.maxAge` to prevent
   * the cookie from expiring when the
   * session is still active.
   *
   * @return {Session} for chaining
   * @api public
   */
  touch: function() {
    return this.resetMaxAge();
  },

  /**
   * Reset `.maxAge` to `.originalMaxAge`.
   *
   * @return {Session} for chaining
   * @api public
   */
  resetMaxAge: function() {
    this.maxAge = this.originalMaxAge;
    return this;
  },

  /**
   * Save the session data with optional callback `fn(err)`.
   *
   * @param {Function} fn
   * @return {Session} for chaining
   * @api public
   */
  save: function(fn){
    this.req.sessionStore.set(this.id, this, fn || function(){});
    return this;
  },

  /**
   * Re-loads the session data _without_ altering
   * the maxAge properties. Invokes the callback `fn(err)`,
   * after which time if no exception has occurred the
   * `req.session` property will be a new `Session` object,
   * although representing the same session.
   *
   * @param {Function} fn
   * @return {Session} for chaining
   * @api public
   */
  reload: function(fn){
    var req = this.req
      , store = this.req.sessionStore;
    store.get(this.id, function(err, sess){
      if (err) return fn(err);
      if (!sess) return fn(new Error('failed to load session'));
      store.createSession(req, sess);
      fn();
    });
    return this;
  },

/**
 * Destroy `this` session.
 *
 * @param {Function} fn
 * @return {Session} for chaining
 * @api public
 */
  destroy: function(fn){
    delete this.req.session;
    this.req.sessionStore.destroy(this.id, fn);
    return this;
  },

/**
 * Regenerate this request's session.
 *
 * @param {Function} fn
 * @return {Session} for chaining
 * @api public
 */
  regenerate: function(fn){
    this.req.sessionStore.regenerate(this.req, fn);
    return this;
  }
};

/**
 * Initialize abstract `Store`.
 *
 * @api private
 */

var Store = function Store(options)
{
    EventEmitter.call(this);
};

/**
 * Inherit from `EventEmitter.prototype`.
 */

util.inherits(Store, EventEmitter);

/**
 * Re-generate the given requests's session.
 *
 * @param {IncomingRequest} req
 * @return {Function} fn
 * @api public
 */

Store.prototype.regenerate = function(req, fn){
  var self = this;
  this.destroy(req.sessionID, function(err){
    self.generate(req);
    fn(err);
  });
};

/**
 * Load a `Session` instance via the given `sid`
 * and invoke the callback `fn(err, sess)`.
 *
 * @param {String} sid
 * @param {Function} fn
 * @api public
 */

Store.prototype.load = function(sid, fn){
  var self = this;
  this.get(sid, function(err, sess){
    if (err) return fn(err);
    if (!sess) return fn();
    var req = { sessionID: sid, sessionStore: self };
    sess = self.createSession(req, sess);
    fn(null, sess);
  });
};

/**
 * Create session from JSON `sess` data.
 *
 * @param {IncomingRequest} req
 * @param {Object} sess
 * @return {Session}
 * @api private
 */

Store.prototype.createSession = function(req, sess){
  var expires = sess.expires
    , orig = sess.originalMaxAge;
  if ('string' == typeof expires) sess.expires = new Date(expires);
  sess.originalMaxAge = orig;
  req.session = new Session(req, sess);
  return req.session;
};

bs.session.store = Store;
    
})( BookSelling );