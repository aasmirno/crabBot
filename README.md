# crabBot
A discord bot that detects and deletes the crab Emoji from any server it is a part of

## Installation
Download the crabBot folder and install it locally using npm:
```
$ cd ../crabBot
$ npm install
```

## Running
Open the folder in a terminal and run ```node ./index.js -h``` to display the help menu

## Options
* -h : Displays the help menu and list of options
* -t  [token] : starts the bot with provided discord bot token

## Misc
crabBot will create a log file in the folder that it is installed

Why command line?

the first iteration of this bot had a hardcoded discord token, and the only way that I could think of removing it was making the bot run from cmd, which also allows me to use the bot for more than one thing.

