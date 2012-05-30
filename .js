!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function') define(definition)
  else this[name] = this['mediatr'] = definition()
}('mediatr', function () {

  var context = this,
      M = (function() {
        var subscribe = function(channel, fn) {
                if (!M.channels[channel]) M.channels[channel] = [];
                M.channels[channel].push({context: this, callback: fn});
                return this;
            },
            publish = function(channel) {
                if (!M.channels[channel]) return false;
                var args = Array.prototype.slice.call(arguments, 1);
                for (var i = 0, l = M.channels[channel].length; i < l; i++) {
                    var subscription = M.channels[channel][i];
                    subscription.callback.apply(subscription.context, args);
                }
                return this;
            };
        
        return {
            channels: {},
            publish: publish,
            subscribe: subscribe,
            installTo: function(obj) {
                obj.subscribe = subscribe;
                obj.publish = publish;
            }
        };
    }());
    
    return M;

});
