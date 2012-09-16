# Achievements

## pine.getAchievements(query)
Returns an array containing instances of pine.Achievement satisfying `query`.

Query:
 * complete: A boolean that if false, returns incomplete achievements, and if true, returns complete ones.

````js
var achieves = pine.getAchievements({
  complete: true
})
````

## pine.getAchievement(slug)
Retruns an instance of pine.Achievement

## Class: pine.Achievement
Represents an achievement as defined in a JSON file read by Pine

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

## achieve.complete()
Returns true if progress >= goal, false otherwise