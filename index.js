/*
 * @index.js
 * Uses discord.js and node.js libraries to detect crab emojis and delete them
 * 
 * @author bonkhound
 * 
 */

const { error } = require('console');
const Discord = require('discord.js');
const client = new Discord.Client();
const fsLib = require('fs');
const { send, exit } = require('process');
const fs = require('fs');

//formatting
console.log();


/*
Command line I/O handling
*/

//processes cmd args
var args = process.argv.slice(2)
var cmd = args[0]
switch ( cmd ) {
    case "-t":
        if ( args.length > 1 ) {
            var id = args[1];
            console.log("Bot token: " + "***" + id.slice(31));
            
            break;
        } else {
            console.log("No token provided");
            console.log();
            displayError();

            break;
        }
        
    default:
        displayHelp();

}

//displays the help menu
function displayHelp() {
    console.log("Run this script with a bot token defined with -t at the command line");
    console.log("Log file can be accesed in the same folder as the bot in 'log.txt' ");
    console.log();
    console.log("Options:\n");
    console.log("   -h                  displays this menu\n");
    console.log("   -t [ bot token ]    runs the script with a bot token");
    exit();

}

//displays token error message
function displayError(){
    console.log("This message was thrown because you did something wrong: ");
    console.log("  Provided bot token : " + id + ", needs to be a valid token");
    exit();
}



/*
Log file handling
*/

//appends file if it exists
if (fs.existsSync( 'log.txt' )) {
    fs.appendFile('log.txt', "crabBot log restarted at: " + new Date().getMonth() + "/" + new Date().getDay() + "/" +new Date().getFullYear() + "  "+ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "\n", function (err){
        if(err) {
            console.log(err);
        }
        console.log('log file found');
    });

//creates new log file if one isnt present
} else {
    fs.writeFile('log.txt', "crabBot log created at: " + new Date().getMonth() + "/" + new Date().getDay() + "/" +new Date().getFullYear() + "  "+ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "\n", function (err){
        if(err) {
            console.log(err);
        }
        console.log('log file created');
    });

} 

//logs message to log file
function logMessage( message ) {
    fs.appendFile('log.txt', " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " " + message.content + " DisplayName: " + message.member.displayName + ", Member#: " + message.member + ", Channel: " + message.channel.toString() + " in " + message.guild.toString(0) + "\n", function (err){
        if(err) {
            console.log(err);
        }
    });
}



/*
discord message handler
*/

//activates lambda on message
client.on('message', message => {
    //writes message to log
    if ( message.member != 776985469752967219 ) {
        //format:  Hour:Minute:Second [message contents, not compatible with images] /n DisplayName: [Display name in the server, if a nickname is present sends nickname], Member#: [Discord unique member number], Channel: [Channel in which message was sent] in [Server in which message was sent] Server
        logMessage( message );
    }
    
    //tests the message for the crab emoji
    if (  message.content.toLowerCase().includes( '🦀') ){

        //deletes message with crab emoji
        message.delete();

        //sends message with scorpion emoji
        message.channel.send(':scorpion:');
     }

});


//logs in to bot ID specified in console if it is longer than 55 characters, most bot tokens are around this length
if ( id.length > 55 ){
    client.login(id);
} else {
    displayError();
    exit();
}

//if everything worked shows active message
console.log("Bot active");