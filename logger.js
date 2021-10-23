const chalk = require("chalk")
class Logger {

    info(text,showLogs=true) {
        showLogs? console.log(chalk.bold.green(text)):null

    }

    error(text) {
        console.log(chalk.bold.red(text))
    }

    heading(text, showLogs=true) {
        showLogs? console.log(chalk.bold.blue(text)):null
    }

    warn(text, showLogs=true){
        showLogs? console.log(chalk.bold.yellowBright(text)):null
    }

}

module.exports=new Logger()