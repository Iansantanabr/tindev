// BOA PRATICA MVC - UM CONTROLER NÃO PODE TER MAIS DO QUE OS 5 MÉTODOS FUNCAMENTAIS
//METODO INDEX, SHOW, STORE, UPDATE, DELETE
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers)

        const {devId} = req.params;
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev){
            return res.status(400).json({ error: 'Dev not exists'});
        }
        
        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            };

            if (targetSocket){
                req.io.to(targetSocket).emit('match',loggedDev);
            };
            console.log('DEU MATCH!')
        }
        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);

    }
};