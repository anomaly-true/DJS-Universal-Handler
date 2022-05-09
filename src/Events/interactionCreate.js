const event = require("../Structures/Event.js");
const Discord = require("discord.js");
const ms = require("ms");


const cooldowns = new Map();
module.exports = new event("interactionCreate", 
/**
 * 
 * @param {Discord.Interaction} interaction 
 */
(client, interaction) => {
    if (interaction.isApplicationCommand()) {
        try {
            const name = interaction.commandName;
            const command = client.commands.get(name)
            if (command) {
                // Permissions check
                if (command.permissions.length > 0) {
                    let mP = false;
                    command.permissions.forEach(permission => {
                        if (!interaction.member.permissions.has(permission)) {
                            mP = true;
                            return interaction.reply({content: "You don't have the required permissions to use this command!", ephemeral: true});
                        }
                    });
                    if (mP) return;
                }

                // Cooldown check
                if (!cooldowns.get(name)) {
                    cooldowns.set(name, new Discord.Collection());
                }
                const time = Date.now();
                const stamp = cooldowns.get(name);
                const cooldown = command.cooldown * 1000;
                if (stamp.has(interaction.user.id)) {
                    const expiration = stamp.get(interaction.user.id) + cooldown;
                    if (time < expiration) {
                        const time_left = ms((expiration - time), { long: true });
                        return interaction.reply({content: `Please wait **${time_left}** before using this command again.`, ephemeral: true});
                    }
                }
                stamp.set(interaction.user.id, time);
                setTimeout(() => stamp.delete(interaction.user.id), cooldown);

                command.execute(client, interaction);
            } else {
                interaction.reply({content: "An error occured while trying to trying to process the command.", ephemeral: true});
            }
        } catch (err) {
            console.log(`\x1b[31m[ERR]\x1b[0m   | ${err}`);
            interaction.reply({content: "An error occured while trying to trying to process the command.", ephemeral: true});
        }
    } else {
        const int = client.interactions.get(interaction.customId)
        if (int && int.type === interaction.type) {
            int.execute(client, interaction); // Didnt actually test this...
        }
    }
})
