const Client = require("./Structures/Client.js");
const {Token} = require("./Config/discord.json");

const client = new Client();
client.start(Token);