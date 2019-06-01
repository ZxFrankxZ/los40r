const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
message.delete();
  message.member.voiceChannel.join().then(async(connection) => {
    await require('http').get("http://21263.live.streamtheworld.com/LOS40_SC", (res) => {
					connection.playStream(res).setVolume(0.2)
    })
  })
  let intervalo = setInterval(zero, 60000)
  function zero() {
    
    let canal = client.guilds.get("574287178016882699").members.get("581889205190262784").voiceChannel.members.size
    //console.log(canal)
    if(canal <= 1) {
      
      let channel = client.channels.get("575359461699354624")
      channel.join().then(() => {
        client.guilds.get("574287178016882699").members.get("581889205190262784").setMute(false)
      })
      clearInterval(intervalo);
      return
    }
  }
  
};
module.exports.help = {
  name: "move"
}
