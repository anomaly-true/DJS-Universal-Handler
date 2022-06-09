const event = require("../Structures/Event.js");
const { Token, Slash_Guild_Mode, Slash_Guild_Mode_Guild_ID, clientId } = require("../Config/discord.json");
const { REST } = require("@discordjs/rest");

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
        if (Slash_Guild_Mode) {
            data = await rest.put(
                `/applications/${clientId}/guilds/${Slash_Guild_Mode_Guild_ID}/commands`,
                { body: commands}
            );
        } else {
            data = await rest.put(
                `/applications/${clientId}/commands`,
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