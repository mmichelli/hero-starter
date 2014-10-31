var move = function(gameData, helpers) {
    var myHero = gameData.activeHero;

    //Get stats on the nearest health well
    var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
                              if (boardTile.type === 'HealthWell') {
                                  return true;
                              }
                              return false;
                          });



    var teamMate = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
                              if (boardTile.type === 'TeamMember') {
                                  return true;
                              }
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


    var weakEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                            return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health < 40;
                        });

    var strongEnemyTileStats= helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(enemyTile) {
                                  return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health > 60;
                              });

    var grave = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(tile) {
                                  return tile.type === 'Unoccupied' && tile.subType === 'Bones';
                              });

    var friendInNeed = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(tile) {
                   return tile.type === 'Hero' && tile.team === myHero.team && tile.health < 30;
               });

    var needHealth =  (strongEnemyTileStats.distance < 3 && myHero.health < 100) || myHero.health < 60 ;


    var priorities = [weakEnemyTileStats,diamondMineStats,grave,friendInNeed ];



    if (needHealth ) {

        return (teamMate && ( healthWellStats.distance > teamMate.distance)  )?teamMate.direction:healthWellStats.direction ;
    }



    var next = priorities.slice(0).sort(function(a,b) {
                   return (a)?a.distance - b.distance: Infinity;
                })


    return ( next[0])?next[0].direction: anyDiamondMineStats.direction;




};

module.exports = move;