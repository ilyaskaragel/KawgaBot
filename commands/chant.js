const {SlashCommandBuilder,Collection} = require('discord.js');
const chantPath = "./data/chants.json"
const chants = require("."+chantPath)
const fs = require("fs");

const Users = new Collection();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("chant")
    .setDescription("Kafeste Kazanma Ve Kaybetme Mesajlarını Ayarlar"),
    async execute(interaction) {
        
        if(!Users.has(interaction.user.id)) Users.set(interaction.user.id, {chant: false});
        if(Users.get(interaction.user.id).chant) return interaction.reply("Bka Sni Toklatlarm Zatn Komdu kllanmşn yzasana bi şyler")
        Users.set(interaction.user.id,{chant: true})
        let chant,fokof;
        let values = [];
        let count = 0;
        await interaction.reply("Kazanınca ve Kaybedince Yazıcağın Şeyleri Sırasıyla At")
        const filter = m => m.author.id == interaction.user.id
        const collector = interaction.channel.createMessageCollector({filter,time:20000})
        collector.on("collect", (collected) =>
        {
            values[count] = collected;
            count++
            if(count == 2)
            {
                chant = values[0].content;
                fokof = values[1].content;
                chants[interaction.user.id] = {
                    chant: chant,
                    fokof: fokof
                }
                fs.writeFile(chantPath, JSON.stringify (chants, null, 2), err => {
                    if (err) throw err;
                })
                interaction.channel.send("Eklendi")
                Users.set(interaction.user.id,{chant: false})
            }
            
        })
        collector.on("end",(collected,reason) => {
            if(reason == 'time') return Users.set(interaction.user.id,{chant: false});
        })
    }
}