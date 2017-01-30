# spiralShooter

Simple shooter game. You are in the middle as enemies surround you.

Click to Start.
Press P to pause. Press P or click to resume.
If you die, you can Press P or click to resume.

Press B to bomb.

Click to fire.

There are 4 powerups currently.

* Multi-fire. Maximum of 5 extra shots until your score gets above a certain 20000, then it adds another one to the maximum for every 20,000 points.
* Bomb. Number of bombs in the lower right hand corner. You start with 1. Press B to bomb, it deals 500 damage to all enemies. If the score is above 25,000, the damage is doubled. Levels 4 and above can not be bombed. Only Level 4 exists currently. 
* Pierce. On the first powerup, it allows the shot to continue to fire. Might change it so each time you get the power up is another enemy the shot can kill, but right now one powerup = continous fire. Additional Pierce powerups then fire 10 random shots.
* Damage Increase. Doubles the damage for each powerup up to 5+score/20000. Once that limit is hit, it then turns into another pierce. This leads to fun effects late in the game when a lot of powerups spawn.

Average chance of powerups dropping:
1/(40/enemy level)
Pierce is 
2/(40/enemy level)

Enemies: 

* Level 1: Low hp, average speed. One hit = death.
* Level 2: Decent Hp, twice the speed of level 1s. Take a few hits to die.
* Level 3: A lot of health, average speed. Has the average chances of powerups, but a 1/4 chance of that being overridden and dropping a bomb.
* Level 4: Low health, very fast, and cant be bombed. 
* Level 5: Not in the game yet, but will spawn 5 level 1s on death. No powerups dropped. Slow speed. 
* Level 6: Not in the game yet, but will randomly spawn levels 1-3 as it moves. 

