# crabBot
A discord bot that detects and deletes the crab Emoji from any server it is a part of

## Installation
Download the crabBot folder and install it locally using npm:
```
$ cd ../crabBot
$ npm install
```

## Running
Open the folder in a terminal and run ```node ./index.js -h``` to display the help menu. The bot is designed to run continuously in the background and should be compatible with most automation methods, personally I had it running on a RPI 4 mod B without any serious issues.

## Options
* -h : Displays the help menu and list of options
* -t  [token] : starts the bot with provided discord bot token

## Logging
crabBot will create a log file in the folder that it is installed but this is (currently) easily changed by editing lines 73,74,83, and 94.  
