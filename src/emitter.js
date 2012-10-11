function Emitter () {
		
}

Emitter.prototype = {
	on: function (event, handler) {
		var events;

		if (!(events = this._events)) events = this._events = {};

		if (!events.hasOwnProperty(event) || events[event].single) {
			events[event] = handler;
		}
		else if (typeof events[event] === 'function') {
			events[event] = [events[event], handler];
		}
		else
		{
			events[event].push(handler);
		}
	},

	single: function (event, handler) {
		var events;

		if (!(events = this._events)) events = this._events = {};

		events[event] = {single: true, handler: handler};
	},

	off: function (event, handler) {
		var events, handlers, i;

		if (!(events = this._events) || !(handlers = events[event])) return;

		if (!event) return delete this._events
		if (!handler || handler === handlers) return delete events[event]
		for (i = 0; i < handlers.length; i++) {
			if (handlers[i] === handler) handlers[i] = false;
		}
	},

	emit: function (event, a, b) {
		var events, i, handlers, length = arguments.length, args;

		if (!(events = this._events) || !(handlers = events[event])) return;

		if (length === 1) args = [];
		else if (length === 2) args = [a];
		else if (length === 3) args = [a, b];
		else args = [].slice.call(arguments, 1);

		if (typeof handlers === 'function') handlers.apply(this, args);
		else if (handlers.single) handlers.handler.apply(this, args)
		else
		{
			for (i = 0; i < handlers.length; i++) if (handlers[i]) handlers[i].apply(this, args);
		}
	}
}