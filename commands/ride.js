const {SlashCommandBuilder,Collection} = require('discord.js');

const Guilds = new Collection();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ride")
        .setDescription("Birini Sür")
        .addUserOption(option =>
			option.setName('target')
				.setDescription('Ride')
				.setRequired(true)),
    async execute(interaction)
    {
        const target = interaction.options.getUser("target");
        const guild = Guilds.get(interaction.guildId);
        if(guild)
        {
            if(guild.riding) return await interaction.reply({content:"Süren Sürüyor",ephemeral:true})
        }
        let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
        Guilds.set(interaction.guildId,{riding: true})
        await interaction.reply(target.username + " Sürmek");
        await interaction.channel.send("https://i.imgur.com/zwRq2oQ.png");
        await sleep(2000);
        await interaction.channel.send("Hayat Güzel");
        await interaction.channel.send("https://tenor.com/view/monkiflip-monki-flip-gif-18149595");
        await sleep(2000);
        await interaction.channel.send(target.username.toUpperCase() + " DALAŞMAK");
        await interaction.channel.send("https://i.imgur.com/03gBl5L.png");
        await sleep(2000);
        await interaction.channel.send(target.username.toUpperCase() + " ÖLDÜR");
        await interaction.channel.send("https://i.imgur.com/r3UfZcc.png");
        await sleep(2000);
        await interaction.channel.send(target.username + " Yok");
        await interaction.channel.send("https://i.imgur.com/z3YxNKw.jpg");
        await sleep(4000);
        await interaction.channel.send("Pişmanlık");
        await interaction.channel.send("https://i.imgur.com/vKFAYAc.png");
        Guilds.set(interaction.guildId,{riding: false});
    }
}