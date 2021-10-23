const yargs = require("yargs")
const fileOperations = require("./fileOperations")

const operationDetail = yargs.argv
const operation = operationDetail._[0]
fileOperations.checkFileStatus()

switch (operation) {
    case "list":
        fileOperations.list(true)
        break;
    case "write":
        fileOperations.write(operationDetail)
        break;
    case "show":
        fileOperations.show(operationDetail)
        break;
    case "remove-one":
        fileOperations.removeOne(operationDetail)
        break;
    case "remove-all":
        fileOperations.removeAll()
        break;
    case "update":
        fileOperations.update(operationDetail)
        break;
    default:
        fileOperations.errorOperation(operation)
}
