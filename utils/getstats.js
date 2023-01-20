const statspath = "./data/stats.json";
const stats = require("." + statspath);
const fs = require("fs");


module.exports = {
    getStats(id)
    {
        if(!stats[id])
        {
            stats[id] = 
            {
                win: 0,
                lose: 0,
            }
            fs.writeFile(statspath, JSON.stringify (stats, null, 2), err => {
                if (err) throw err;
            })
        }
        return stats[id]
    }
}