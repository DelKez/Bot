module.exports.cmd = function (cmd){

    cmd = cmd.split(" ");

    i = 0;
    while (i < cmd.length){
        if (cmd[i].indexOf("_") >= 0){
            cmd[i] = spc(cmd[i]);
        }
        i++;
    }
    return cmd
}

function spc(cmd){
    
    cmd = cmd.split("_");

    mot = "";
    i = 0;
    while (i < cmd.length-1){
        mot = mot + cmd[i] + " ";
        i++;
    }
    mot = mot + cmd[i];
    return mot
}

module.exports.sspc = function (cmd){

    mot = cmd[0]

    i = 1;
    while (i < cmd.length){
        mot = mot + "," + cmd[i]
        i++;
    }
    return mot
}