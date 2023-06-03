/*
 * @index.js
 * Uses discord.js, node.js, and minimist to detect crab emojis and delete them
 * 
 * @author bonkhound
 * 
 */
process.on("unhandledRejection", error => console.error("Promise rejection:", error));
const { error } = require('console');
const Discord = require('discord.js');
const client = new Discord.Client();
const fsLib = require('fs');
const { send, exit } = require('process');
const fs = require('fs');

var botToken = " "

/*
Command line I/O handling
*/
console.log();
//use minimist to parse command line arguments
var argv = require('minimist')(process.argv.slice(2), {
    string: 't',
});
//send to command logic function
getCommands(argv)

//initialise logging
createLog();

/*
*   Handles command line logic
*/
function getCommands(arguments) {
    botToken = arguments.t;
    console.log("Provided discord bot token: " + botToken)
}

/*
*   displays the help menu
*/
function displayHelp() {
    console.log("Run this script with a bot token defined with -t at the command line");
    console.log("Log file is stored in the same directory as the executable by default");
    console.log();
    console.log("Options:\n");
    console.log("   -h                  displays this menu\n");
    console.log("   -t [ bot token ]    runs the script with a discord bot token");
    exit();
}

//displays token error message
function displayError() {
    console.log()
    console.log("An error has occurred, printing and exiting")
    console.log("Provided bot token was: " + botToken);
    console.log("Arguments were: " + process.argv.slice(2))
    exit();
}

/*
Log file handling
*/

function createLog() {
    //appends file if it exists
    if (fs.existsSync('log.txt')) {
        fs.appendFile('log.txt', "crabBot log restarted at: " + (new Date().getHours() - 12) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "\n", function (err) {
            if (err) {
                console.log(err);
            }
            console.log('log file found');
        });

        //creates new log file if one isnt present
    } else {
        fs.writeFile('log.txt', "crabBot log created at: " + (new Date().getHours() - 12) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "\n", function (err) {
            if (err) {
                console.log(err);
            }
            console.log('log file created');
        });
    }
}

//logs message to log file
function logMessage(message) {
    fs.appendFile('log.txt', " " + (new Date().getHours() - 12) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " " + message.content + " DisplayName: " + message.member.displayName + ", Member#: " + message.member + ", Channel: " + message.channel.toString() + " in " + message.guild.toString(0) + "\n", function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//promise failure callback
function failure() {
    displayError();
    exit();
}

//promise success callback
function success() {
    console.log("Bot active");
}

//attempt to connect to the discord api and handle promise
client.login(botToken).then(success, failure);

/*
Message Handling
*/
//activates lambda on message
client.on('message', message => {
    //writes message to log

    /* Log Format:  
    Hour:Minute:Second [message contents, not compatible with images] /n 
    DisplayName: [Display name in the server, if a nickname is present sends nickname], 
    Member#: [Discord unique member number], 
    Channel: [Channel in which message was sent] in [Server in which message was sent] Server
    */
    logMessage(message);

    //check for emoji
    if (message.content.toLowerCase().includes('🦀')) {
        //deletes message with crab emoji
        message.delete();
    }
});