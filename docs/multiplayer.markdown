# Multiplayer


## pine.createRoom([data][, subrooms])
Creates an instance of pine.Room with arbitrary data that is accessible to invited players (optional, defaults to an empty object). `subrooms` is a boolean determining if the [sub-rooms](#sub-rooms) feature should be turned on


## Class: pine.Room
Represents a multiplayer session


## room.init([data])
Send initiation data (optional, defaults to an empty object) to the other players in the room. Must be called for the player to join the room.


## roomsub([name])
If a name is provided, switch to that subroom; if a name is not provided, return the name of the current subroom


## room.data
An object as defined when the room is created.


## room.users
An array containing instances of pine.User representing users present in the room


## room.invite(users[, message], number)
Invite each user in `users`, accepting the first `number` who respond. `message` is the message to be shown to invited players (defaults to "{me} has invited you to play {game}.")

The following variables can be included in the message template:
 * me: The name of the player inviting
 * game: The name of the game


## room.on('join', function (user, init, events))
Triggered for each user in the room and for each new user joining. `user` is an instance of pine.User, `init` is the initiation data sent (if any) and `events` is an instance of pine.Emitter that listens for events triggered on the user's room object.


## pine.on('invite', function (from, message, data, callback))
Triggered when user is invited to a room, overriding the native prompt.
 * `from` is an instance of pine.User representing the user who is inviting
 * `message` is a string that should be shown to the user, as specified when the invitation was sent
 * `data` holds the data saved to the room when it was created
 * callback must be called with a single boolean argument: true if accepting the invite, false otherwise


## pine.on('multiplayer', function (room))
Triggered when the current user has accepted an invite. `room` is an instance of pine.Room.


## Sub-rooms
Rooms can be split up into smaller rooms to cut down on extraneous network traffic


## Example
````js
function init_room (room) {
  prepare_screen_for_multiplayer()  
  
  room.init({
    appearance: player.appearance()
  })
  
  room.on('join', function (user, init, events) {
    var character = render_new_user(user.name, init.appearance)
    
    events.on('move', function (x, y) {
      character.moveTo(x, y)
    })
  })
  
  player.on('move', function (x, y) {
    // The other players are only visible when in the same area (left, right, middle)
    if (x < -50) {
      room.sub('left')
    }
    else if (x > 50) {
      room.sub('right')
    }
    else
    {
      room.sub('center')
    }
    
    room.emit('move', x, y)
  })
}

function invite_friends () {
  var room = pine.createRoom({type: "battle"}, true)
  room.invite(pine.getFriends({online: true}), "{me} has invited you to battle", 4)
  init_room(room)
}

pine.on('invite', function (host, message, cb) {
  display_invite_notification(message, function (confirm) {
    cb(confirm, function (success) {
      if (!success) display_failure_notification()
    })
  })
})

pine.on('multiplayer', init_room)
````