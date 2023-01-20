const {SlashCommandBuilder} = require("discord.js")
function shuffle(value)
{
    return value.split('').sort(function(){return 0.5-Math.random()}).join('');
}
module.exports = {
    data: new SlashCommandBuilder()
    .setName("tekrarla")
    .setDescription("ketarral")
    .addStringOption(option => 
        option.setName("metin")
        .setDescription("Tekrarlanacak Metin")
        .setRequired(true)
    ),

    async execute(interaction) {
        let sentence = interaction.options.getString("metin");
        let tekrarla = sentence.split(" ");
        sentence = ""
        tekrarla.forEach(element => 
        {
            try
            {
                if (element.startsWith('<@') && element.endsWith('>')) {
                    element = element.slice(2, -1);
                
                    if (element.startsWith('!')) {
                        element = element.slice(1);
                    }
                    element = message.guild.members.cache.get(element).displayName;
                }
            }
            catch(err)
            {

            }
            sentence += " " + shuffle(element);
            });
        interaction.reply(shuffle(sentence));
    }
    
}