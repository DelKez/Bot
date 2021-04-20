module.exports.msg = function (client,ID,msg){
    client.users.fetch(ID).then((user) => {
        user.send(msg)
    })
}