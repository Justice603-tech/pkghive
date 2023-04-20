#!/usr/bin/env node
const yargs = require('yargs');
const { exec } = require('child_process');
const fs = require('fs')
var packagedata = ""
var packagejson = ''
var convertedjson = ''
yargs.command({
    command: 'download <pkg>',
    describe: 'Download Package',
    handler(argv) {
        packagedata = argv.pkg.slice([0,1,2,3,4])
        exec(`npm install ${packagedata}`,  (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
              }
            
              if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
              }
                 console.log("Sucessfully installed packages")
            })
    }
})


yargs.command({
    command: 'init <packname>',
    describe: 'Create package.json file',
    builder: {
        author: {
            alias: 'a',
            describe: 'Package Author',
            demandOption: true
        },
        main: {
            alias: 'm',
            describe: 'Entry Point for script. (ex: index.js)',
            demandOption: true
        }
    },

    handler(argv){
        packagejson = {
            name: argv.packname,
            version: "1.0.0",
            description: "package created with pkghive",
            main: argv.main,
            scripts: {
                test: "node index.js"
              },
            keywords: [
                "pkg",
                "project"
              ],
            author: argv.author,
            license: "ISC",
            dependencies: {}
        }

        convertedjson = JSON.stringify(packagejson)

        dir = argv.output

        
          fs.writeFile("package.json", convertedjson, function(err) {
             if(err) throw err

             console.log("Created Package.json");
          })
    }
})    

yargs.parse()