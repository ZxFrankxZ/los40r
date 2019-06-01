const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
//client.login(process.env.SECRET)

client.on("ready", () => {
  
  console.log("Online!");
  client.user.setPresence({
    status: 'online',
    game: {
      name: "Los 40 principales Radio by ZxFrankxZ#1332",
      type: 'LISTENING'
    }
  })
  
  
  //let con = client.channels.get("575359461699354624").join()
  
  function loop() {
    let canal = client.channels.get("575359461699354624").members.size
    //console.log(canal)
    
    if(canal >=1 && client.guilds.get("574287178016882699").members.get("581889205190262784").voiceChannel === undefined){
      iniciar()
      console.log("iniciado "+ new Date());
    }
    if(canal === 1 && client.guilds.get("574287178016882699").members.get("581889205190262784").voiceChannel !== undefined) {
      parar();
      console.log("parado "+ new Date())
    }
    
  }
  setInterval(loop, 1000)
  function iniciar() {
    client.channels.get("575359461699354624").join().then(connection => {
      client.guilds.get("574287178016882699").members.get("581889205190262784").setMute(false)
      
      if(connection.speaking === true) return;
      require('http').get("http://21263.live.streamtheworld.com/LOS40_SC", (res) => {
        connection.playStream(res).setVolume(0.2)
      })
    })
  }
  
  function parar() {
    client.channels.get("575359461699354624").leave()
  }
})

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if(err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No hay comandos para cargar");
    return;
  }
  console.log(`Cargando ${jsFiles.length} comandos`);

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    client.commands.set(props.help.name, props)
  });
});


let prefix = "-"
client.on("message", async(message) => {
  let guild = message.guild;
    let args = message.content.split(" ").slice(1).join(" ");
  let command = message.content.toLowerCase().split(" ")[0];
  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd)
    cmd.run(client, message, args);
});