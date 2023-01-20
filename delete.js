
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {CLIENT_ID,GUILD_ID,TOKEN} = require("./config.json")


const rest = new REST({ version: '10' }).setToken(TOKEN);
rest.get(Routes.applicationCommands(CLIENT_ID))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(CLIENT_ID)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });