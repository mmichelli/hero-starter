var move = function(gameData, helpers) {
    var myHero = gameData.activeHero;

    //Get stats on the nearest health well
    var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
                              if (boardTile.type === 'HealthWell') {
                                  return true;
                              }
                              return false;
                          });



    var diamondMineStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(mineTile) {
                               if (mineTile.type === 'DiamondMine') {
                                   if (mineTile.owner) {
                                       return mineTile.owner.team !== myHero.team;
                                   } else {
                                       return true;
                                   }
                               }
                           });

    var enemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                            return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team ;
                        });


    var weakEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                            return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health < myHero.health;
                        });

    var strongEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                                  return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health > myHero.health;
                              });



    if (myHero.health < 50 && healthWellStats.distance === 1 ) {
        return healthWellStats.direction;
    }
    if (myHero.health >60  && healthWellStats.distance === 1 && enemyTileStats.distance === 1) {
        return enemyTileStats.direction;
    }
    else if (myHero.health/healthWellStats.distance < 10 ) {
        return healthWellStats.direction;
    }
    else if (myHero.health < 40) {
        return healthWellStats.direction;
    }
    else if (strongEnemyTileStats && strongEnemyTileStats.distance  < 2) {
        return healthWellStats.direction;
    }
    else if (weakEnemyTileStats && weakEnemyTileStats.distance  === 1) {
        return weakEnemyTileStats.direction;;
    } else if (diamondMineStats.distance  === 1) {
        return diamondMineStats.direction;
    }  else if(myHero.health > 91 ){
        return  diamondMineStats.direction;
    }else{
        return healthWellStats.direction;
    }
};

module.exports = move;