const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
message.delete();
  let channel = client.channels.get("575359461699354624")
  channel.leave()
    client.destroy().then(() => {
      client.login(process.env.SECRET)
    })
};
module.exports.help = {
  name: "restart"
}
