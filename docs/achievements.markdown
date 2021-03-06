# Achievements


## pine.getAchievements([query])
Returns an array containing instances of pine.Achievement satisfying `query`.

Query:
 * complete: A boolean that if false, returns incomplete achievements and if true, returns complete ones.

````js
var achieves = pine.getAchievements({
  complete: true
})
````


## pine.getAchievement(slug)
Retruns an instance of pine.Achievement corresponding to the passed `slug`

````js
var achieve = pine.getAchievement('kill_10_zombies')
````


## Class: pine.Achievement
Represents an [achievement](https://github.com/jeremyckahn/pine/wiki/Achievements)


## achieve.slug
 * String
 
A string with which to identify the achievement

## achieve.title
 * String
 
The title of the achievement


## achieve.desc
 * String

The description of the achievement


## achieve.icon
 * String

The path to the icon of the achievement


## achieve.progress
 * Number

The progress toward the goal of the achievement


## achieve.goal
 * Number

The goal the achievement must reach to be complete


## achieve.isComplete()
Returns true if progress >= goal, false otherwise


## achieve.incr([amount][, options])
  * amount: Amount to increment the progress of the achievement by, defaults to 1.
  * options: See [Achievement method options](#achievement-method-options)
Increments the progress of the achievement by the given `amount`.


## achieve.set(amount[, options])
  * amount: Amount to set the progress of the achievement to, defaults to 1.
  * options: See [Achievement method options](#achievement-method-options)
Sets the progress of the achievement to the given `amount`.


## achieve.unlock([options])
  * options: See [Achievement method options](#achievement-method-options)
Sets the progress of the achievement to the goal, completing it.


## Achievement method options
 * notify: if this option is not set to false and the method called caused an achievement to become completed, the 'achievement' event will not be triggered and no native notification will appear. Defaults to true.


## pine.on('achievement', function (achieve))
Triggered whenever an achievement is completed. Binding to this event will prevent native notification (such as a message in the corner of the screen)