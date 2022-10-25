import chalk from "chalk";

const successColor = (text) => chalk.greenBright(text)
const infoColor = (text) => chalk.bgBlackBright.yellowBright(text)
const suiteColor = (text) => chalk.bgGreenBright.whiteBright(text)

const addSpace = (amount) => {
    let newAmount = amount;
    let spaces = ""
    while (0 < newAmount) {
        spaces += " "
        newAmount--
    }
    return spaces
}

const addNewLine = () => {
    return "\n"
}

const log = (text, spaces = 0) => console.log(addSpace(spaces) + text)

export const printSuccess = (text = "Success") => log(successColor(text), 2)

export const printInfo = (text) => log(infoColor(text), 1)

export const printSuite = (test) => log(suiteColor(addNewLine() + "Test Suite - " + test))

export const printError = (test) => log(chalk.red(test), 2)