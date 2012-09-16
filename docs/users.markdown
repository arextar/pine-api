# Users


## pine.getFriends([query])
Returns an array containing instances of pine.User satisfying `query` that are friends of the current user.

Query:
 * online: A boolean that if false, returns offline users and if true, returns online ones.
 * connected: A boolean that if false, returns users not in a [multiplayer session]() with the current user and if true, returns ones that are.

````js
var friends = pine.getFriends({
  online: true,
  connected: false
})
````


## Class: pine.User
Represents a user in the Pine ecosystem


## user.name
 * String
 
The username of `user`


## user.friend
 * Boolean

True if `user` is a friend of the current user, false otherwise


## user.online
 * Boolean

True if `user` is online, false otherwise


## user.connected
 * Boolean

True if `user` is currently in a multiplayer session with the current user, false otherwise


## pine.on('friend', function (type, user))
Triggers whenever...
 * a friend comes online
  * type = "online"
 * a friend goes offline
  * type = "offline"
 * a new friend is added
  * type = "new"

````js
pine.on('friend', function (type, user) {
  if (type === 'new') {
    add_user(user)
  }
  else
  {
    update_user(user.name, user.online)
  }
})
````