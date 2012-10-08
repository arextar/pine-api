function Pine (options, callback) {
	var ws = this.ws = binary_emitter.wrap(new WebSocket(options.url)),
		that = this;
	this.options = options;

	ws.emit('init', options, function (data) {
		for (var x in data) {
			that[x + '_data'] = data[x]
		}
	})
}

var pine_fn = Pine.prototype = new Emitter();