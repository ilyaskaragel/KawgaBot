const statspath = "./data/stats.json";
const stats = require("." + statspath);
const fs = require("fs");

module.exports =
{
    statsSave(id,key)
    {
        if(!stats[id])
        {
            stats[id] = 
            {
                win: 0,
                lose: 0,
            }
        }
        stats[id][key] = stats[id][key] + 1;
        fs.writeFile(statspath, JSON.stringify (stats, null, 2), err => {
            if (err) throw err;
        })
    }
}