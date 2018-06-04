mp.events.addCommand('money', (player) => {
    player.outputChatBox("Money: " + player.money);
});

mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`===========[ Stats ]===========`);
    player.outputChatBox(`Name: ${player.name}, Money: ${player.money}, Admin: ${player.admin}`);
    player.outputChatBox(`===============================`);
    // mp.players.forEach(
    //     (playerD) => {
    //         player.outputChatBox("1. " + JSON.stringify(playerD) + " 2. " + playerD.name);
    //     }
    // );
});

//Level 1
mp.events.addCommand("ahelp", (player) => {
    if(player.admin < 1) return player.outputChatBox("You do not have permission to do that");
    player.outputChatBox("[1] /pos, /veh");
    player.outputChatBox("[2]");
    player.outputChatBox("[3] /updatemoney, /updateadmin");
});



mp.events.add("findplayer", (player, _, target) => {
    let targetPlayer = findPlayer(target);
    player.outputChatBox("Found: " + targetPlayer);
});

mp.events.addCommand('pos', (player) => {
    if(player.admin < 1) return player.outputChatBox("You do not have permission to do that");
    player.outputChatBox(`Position: ${player.position}`);
    player.outputChatBox(`Heading: ${player.heading}`);
});

mp.events.addCommand('veh', (player, _, veh_model) => {
    if(player.admin < 1) return player.outputChatBox("You do not have permission to do that");
    if(!veh_model) return player.outputChatBox("/veh [model]");
    let player_veh = mp.vehicles.new(mp.joaat(veh_model), player.position,
        {
            heading: player.heading,
            engine: true
        });

    player.putIntoVehicle(player_veh, -1);
})

//Level 2
mp.events.addCommand('goto', (player, _, loc) => {
    if(player.admin < 2) return player.outputChatBox("You do not have permission to do that");
    if(!loc) return player.outputChatBox("/goto [location] - Use '/goto help' for locations");
    switch(loc.toLowerCase()){
        case 'help':
            player.outputChatBox("Goto Locations: LSPD, FIB, Army, PaletoBay, GrapeSeed, SandyShores");
            break;
        case 'lspd':
            player.position = new mp.Vector3(426.10, -977.90, 31);
            break;
        case 'fib':
            player.position = new mp.Vector3(95.89, -743.12, 46);
            break;
        case 'army':
            player.position = new mp.Vector3(-2230.69, 3316.90, 33.5);
            break;
        case 'paletobay':
            player.position = new mp.Vector3(-405.08, 5988.11, 32);
            break;
        case 'grapeseed':
            player.position = new mp.Vector3(1683.45, 4777.93, 41.9);
            break;
        case 'sandyshores':
            player.position = new mp.Vector3(2050.84, 3722.94, 33);
            break;
        default:
            player.outputChatBox("/goto [location] - Use '/goto help' for locations");
        break;
    }
});

mp.events.addCommand('gotopos', (player, _, x, y, z) => {
    if(player.admin < 2) return player.outputChatBox("You do not have permission to do that");

});

//Level 3
mp.events.addCommand('updatemoney', (player, _, num) => {
    if(player.admin < 3) return player.outputChatBox("You do not have permission to do that");
    if(!num || isNaN(num)) return player.outputChatBox("/updatemoney [number]");
    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [num, player.name], function(err, res){
        if(!err){
            player.money = num;
            player.outputChatBox("Money Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('updateadmin', (player, _, lvl) => {
    if(player.admin < 3) return player.outputChatBox("You do not have permission to do that");
    if(!lvl || isNaN(lvl)) return player.outputChatBox("/updateadmin [level]");
    gm.mysql.handle.query('UPDATE `accounts` SET admin = ? WHERE username = ?', [lvl, player.name], function(err, res){
        if(!err){
            player.admin = lvl;
            player.outputChatBox("Admin Rank Updated");
        } else {
            console.log(err);
        }
    });
});

function findPlayer(name){
    let match;
    mp.players.forEach(
        (pInfo) => {
            if(pInfo.name.toLowerCase() == name.toLowerCase()){
                match = pInfo;
            }
        }
    );
    return match;
}