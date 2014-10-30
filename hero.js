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

    var anyDiamondMineStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(mineTile) {
                               return mineTile.type === 'DiamondMine' && mineTile.owner !== myHero;
                           });

    var enemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                            return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team ;
                        });


    var weakEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                            return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health < 40;
                        });

    var strongEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                                  return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health > 60;
                              });
    var grave = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(tile) {
                                  return tile.type === 'Unoccupied' && tile.subType === 'Bones';
                              });

    var mate = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(tile) {
                   return tile.type === 'Hero' && tile.team === myHero.team && tile.health < 50;
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
    else if (diamondMineStats && diamondMineStats.distance  === 1) {
        return diamondMineStats.direction;
    }
    else if (myHero.health > 60 && mate && mate.distance  < 2) {
        return mate.direction;
    }
    else if (weakEnemyTileStats && weakEnemyTileStats.distance  < 3) {
        return weakEnemyTileStats.direction;
    }
    else if (grave && grave.distance  === 1) {
        return grave.direction;
    }
    else if (grave && grave.distance  < 3) {
        return grave.direction;
    }
    else if(diamondMineStats && myHero.health > 81 ){
        return  diamondMineStats.direction;
    }

    else if (anyDiamondMineStats && myHero.health > 81) {
        return anyDiamondMineStats.direction;
    }
    else{
        return healthWellStats.direction;
    }
};

module.exports = move;