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

module.exports.scmd = function (cmd){

    if (cmd[0].indexOf(" ") >= 0){
        cmd[0] = sspc(cmd[0]);
    }

    i = 1;
    while (i < cmd.length){
        if (cmd[i].indexOf(" ") >= 0){
            cmd[i] = sspc(cmd[i]);
        }
        i = i+1
    }
    return cmd
}

function sspc(cmd){
    
    cmd = cmd.split(" ");

    mot = "";
    i = 0;
    while (i < cmd.length-1){
        mot = mot + cmd[i] + "_";
        i++;
    }
    mot = mot + cmd[i];
    return mot
}