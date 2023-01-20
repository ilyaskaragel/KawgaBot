const {Collection,ActionRowBuilder,ButtonBuilder,ButtonStyle, SlashCommandBuilder} = require('discord.js');
const chants = require("../data/chants.json")
const {statsSave} = require("../utils/savestats");
const savestats = require('../utils/savestats');

const Guilds = new Collection();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("gelkafes")
        .setDescription("KawgaDövüj")
        .addUserOption(option =>
			option.setName('target')
				.setDescription('Fight')
				.setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const guild = Guilds.get(interaction.guildId);
        if(guild)
        {
            if(guild.kawga) return await interaction.reply({content:"Dövj Aktif",ephemeral:true})
        }
        if(target.id == interaction.user.id)
        {
            return await interaction.reply("Kendinle Dövjme La");
        }
        else if(target.id == interaction.client.user.id)
        {
            return await interaction.reply("Benle Dövjme Ağır Olur");
        }
        else if(target.bot)
        {
            return await interaction.reply("Botlar Olmza");
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("Yes")
            .setLabel("Yes")
            .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId("No")
            .setLabel("No")
            .setStyle(ButtonStyle.Secondary)
        )
        Guilds.set(interaction.guildId,{
            kawga: true,
        });
        await interaction.reply({ content: `${target} ${interaction.user} Tarafından Kafes Dövüşüne Çağırıldın Kafese Girmeyi Kabul Ediyor Musun`, components: [row] })
        const message = await interaction.fetchReply();
        const collector = await interaction.channel.createMessageComponentCollector({time: 20000});
		collector.on('collect', async i => {
            if(i.user.id == target.id)
            {
                if(i.customId == "Yes")
                {
                    await i.update({content: "Dövj Kabul Edildi",components: []});
                    let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
                    await message.channel.send("3");
                    await sleep(1000)
                    await message.channel.send("2");
                    await sleep(1000)
                    await message.channel.send("1");
                    await sleep(1000)
                    const number =  Math.floor(Math.random() * 2);
                    let winner,loser
                    if(number == 1)
                    {
                        winner = interaction.user;
                        loser = target;                    
                    }
                    else
                    {
                        winner = target
                        loser = interaction.user
                    }
                    statsSave(winner.id,"win")
                    statsSave(loser.id,"lose")
                    await message.channel.send(winner.username + " Kawga Dövjü Kaznadı Hella Olsn");
                    if(chants[winner.id]){
                        if(chants[winner.id].chant);
                        {
                            if(!chants[winner.id].chant == "")
                            {
                                interaction.channel.send(chants[winner.id].chant)
                            } 
                        }
                    }
                    if(chants[loser.id]){
                        if(chants[loser.id].fokof);
                        {
                            if(!chants[loser.id].fokof == "")
                            {
                                interaction.channel.send(chants[loser.id].fokof)
                            } 
                        }
                    }
                }
                else
                {
                   await message.channel.send("Dövj İptal")
                }
                Guilds.set(interaction.guildId,{
                    kawga: false,
                });
            }
            else
            {
                await i.reply({content: "Bu Dövjün Hedefi Sen Değilsin", ephemeral: true})
            }
        });
        collector.on("end", () => {
            Guilds.set(interaction.guildId,{
                kawga: false,
            });
        })        
        
    }
}