#!/usr/bin/env node

// const { Command } = require('commander')
// import { Command } from 'commander'
// const program = new Command()
//
// program
//   .name('nodestow')
//   .description('gnu stow but build using nodejs')
//   .version('0.0.1')
//
// program
//   .command('split')
//   .description('Split a string into substrings and display as an array.')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });
//
// program
//   .command('join')
//   .description('Join the command-arguments into a single string')
//   .argument('<strings...>', 'one or more strings')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((strings, options) => {
//     console.log(strings.join(options.separator));
//   });
//
// program.parse()

// TODO: list
// get the args
// if arg is "." then get all file and folder in the current dir
// if arg is specific file/dir then only symlink that file/dir
// if using --target option then use that folder as a target otherwise then use home dir
// google on what's the needed requirement to symlink file
// -s command to symlink
// -d command to delete symlink
// -r command to delete and then do another symlink

const process = require('process')

const availableCommand = {
  'option': {
    '--start': {
      'description': "to start the app",
      command: function (data) {
        return data == null || data == undefined ? "starting the app" : `starting the app with ${data}`
      }
    },
    '--build': {
      'description': 'to build the app',
      command: function () {
        return "building the app"
      }
    },
  }
}

try {
  const getArgument = getArgs(process.argv)
  console.log(getArgument)
  // const cmd = executeCommand(getArgument)
  // console.log(cmd)
} catch(err) {
  console.log(err.message)
  console.log(usage())
}

// get args and split it between options, flags or args
function getArgs(input) {
  const optionObj = {}
  const flagObj = {}
  const argArr = []
  const output = {}

  input.splice(0, 2)
  input.map((inp, index) => {
    if (inp == "--start") {
      console.log("start yooo")
    }
    // if (inp.slice(0, 2) === "--") {
    //   let argArray = inp.split("=")
    //   let argOption = argArray[0]
    //   let argValue = argArray.length > 1 ? argArray[1] : null
    //   optionObj[argOption] = argValue
    // } else if (inp[0] === "-") {
    //   let flags = inp.slice(1).split("")
    //   flags.forEach((flag) => {
    //     flagObj[flag] = null
    //   })
    // } else {
    //   argArr.push(inp)
    // }
  })
  output["option"] = optionObj
  output["flag"] = flagObj
  output["args"] = argArr
  return output
}

// get args and iterate the key and see if the args exist in availableCommand and return the value of each arg function inside of availableCommand
function executeCommand(input) {
  let cmd = {}

  for (const [key, value] of Object.entries(input)) {
    for (const [k, v] of Object.entries(value)) {
      // console.log(availableCommand[key][k].command())
      if (key == 'args') {
        if (!availableCommand[key].hasOwnProperty(v)) throw new Error(`Unknown or unexpected option: ${v} \n`)
        cmd[k] = availableCommand[key][v].command(v)
      } else {
        if (!availableCommand[key].hasOwnProperty(k)) throw new Error(`Unknown or unexpected option: ${k} \n`)
        cmd[k] = availableCommand[key][k].command(v)
      }
    }
  }
  return Object.values(cmd)
}

// list available command if you use wrong command
function usage() {
  return `tool [CMD]\n --start\tStarts the app\n --build\tBuilds the app`
}
