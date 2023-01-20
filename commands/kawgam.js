const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const {getStats} = require('../utils/getstats')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("kawgam")
    .setDescription("Kawga Statları"),

    async execute(interaction) {
        const stats = getStats(interaction.user.id);
        var x = 5;
        x.to
        const embed = new EmbedBuilder()
        .setAuthor({name:interaction.user.username,iconURL:interaction.user.avatarURL()})
        .addFields(
        {name:"Kaznadıggın Syı",value:stats.win.toString()},
        {name:"Sni Düzddüklri Syı",value:stats.lose.toString()}
        )
        interaction.reply({embeds:[embed]});
    }
}