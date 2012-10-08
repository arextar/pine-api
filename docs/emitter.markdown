# Emitter

## Class: pine.Emitter
An object to which events are bound and triggered


## emitter.on(event, handler)
Bind handler to the event `event`.


## emitter.off([event][, handler])
if no arguments are passed, all handlers on the emitter are removed
if only an `event` is passed, all handlers on that event are removed
if both an `event` and a `handler` are passed, remove that specific 

## emitter.emit(event[, args...])
Triggers all handlers bound to the given event, passing the given arguments.

## emitter.single(event, handler)
Binds a handler to the event `event` that will be unbound the next time a handler is bound (good for default actions that are overriden by binding).