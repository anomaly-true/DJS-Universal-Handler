const event = require("../Structures/Event.js");
const { Token } = require("../Config/discord.json");
const { REST } = require("@discordjs/rest");

const clientID = "972270809135603732"
const guildID = "961553935062159360"
const guildMode = true;
module.exports = new event("ready", async(client) => {
    console.log("\x1b[32m[BOT]\x1b[0m   | Ready!");
    const commands = [];
    client.commands.forEach(command => {
        commands.push(command.command);
    });
    const rest = new REST({ version: 9}).setToken(Token);
    try {
        console.log("\x1b[32m[CMD]\x1b[0m   | Refreshing slash commands");
        let data;
        if (guildMode) {
            data = await rest.put(
                `/applications/${clientID}/guilds/${guildID}/commands`,
                { body: commands}
            );
        } else {
            data = rest.put(
                `/applications/${guildID}/commands`,
                { body: commands}
            )
        }
        data.forEach(command => {
            const cmd = client.commands.get(command.name)
            cmd["id"] = command.id;
        });
        console.log("\x1b[32m[CMD]\x1b[0m   | Successfully refreshed slash commands");
    } catch(err) {
        console.log(`\x1b[31m[ERR]\x1b[0m   | ${err}`);
    }
})