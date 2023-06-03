# crabBot
A discord bot that detects and deletes the crab Emoji from any server it is in.

## Installation
Clone the crabBot folder and install it locally using npm:
```
$ cd ../crabBot
$ npm install
```

## Running
Open the folder in a terminal and run ```node ./index.js -h``` to display the help menu. The bot is designed to run continuously in the background and should be compatible with most automation methods, personally I had it running on a RPI 4 mod B without any issues.

## Options
* -h : Displays the help menu and list of options
* -t  [token] : starts the bot with provided discord bot token

## Logging
crabBot will search for a '''log.txt''' file in the same directory as itself and create one if it does not exist.

## Discord bot permissions
In the discord developer portal message content intent must be enable in order to view and manage messages, this program will not work with a bot that does not have this setting enabled.
