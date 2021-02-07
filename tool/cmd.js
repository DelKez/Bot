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