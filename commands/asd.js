const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
    let use = client.guilds.get("574287178016882699").me.speaking
    console.log(use)
  
};
module.exports.help = {
  name: "test"
}
