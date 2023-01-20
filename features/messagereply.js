module.exports = {
    async checkMessage(message)
    {
        if(message.content.toLowerCase() == "lanlan")
        {
            await message.channel.send("lanlan");
        }
        else if (message.content.toLowerCase() == "yarra")
        {
            await message.channel.send("myalaa");
        }
    }
}