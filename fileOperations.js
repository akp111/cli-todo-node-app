const fs = require("fs")
const logger = require("./logger")
const fileName = "notes.json"
class FileOperations {

    checkFileStatus(showLogs = true) {
        try {
            logger.heading("🥁 Checking if files exist or not", showLogs)
            if (!fs.existsSync(fileName)) {
                logger.info("☑️ File doesnt exists! Creating one", showLogs)
                fs.appendFileSync(fileName, "");
            }
            else {
                logger.info("☑️ File exists!", showLogs)
            }

        } catch (error) {
            loggger.error(`❌ Error in append operation: ${error}`)

        }
    }

    write(operationDetail, showLogs = true) {
        try {
            if (Object.keys(operationDetail).includes("title") && Object.keys(operationDetail).includes("body")) {
                logger.heading(`🥁 Performing write operation for --> ${operationDetail.title}`, showLogs)
                logger.info(`🕵️‍♂️ Checking if Title:${operationDetail.title} exists or not`, showLogs)
                let allList = this.list(false)
                let data = null
                allList == null || allList == "" || allList == undefined ? allList = {} : allList = allList
                if (Object.keys(allList).length != 0) {
                    data = this.show(operationDetail, false)
                    if (data) {
                        logger.info(`🙅 It already exists`, showLogs)
                    }
                }
                if (!data) {
                    logger.info(`🏃 Making fresh entry`, showLogs)
                    allList[operationDetail.title] = ({ title: operationDetail.title, body: operationDetail.body })
                    fs.writeFileSync(fileName, JSON.stringify(allList), (error) => {
                        if (error)
                            throw error
                    })
                }
            }
            else
                !operationDetail.title && operationDetail.body ? logger.warn("❌ Error in write operation: Title Not found") : !operationDetail.body && operationDetail.title ? logger.warn("❌ Error in write operation: Body not found") : logger.warn("❌ Error in write operation: No title and body found")
        }

        catch (error) {
            logger.error(`❌ Error in write operation: ${error}`)

        }

    }

    list(showLogs = true) {
        try {
            logger.heading("🥁 Performing list operation!", showLogs)
            const data = JSON.parse(fs.readFileSync(fileName))
            if (data != null || data != "") {
                let tableData = []
                Object.keys(data).map((item, index) => {
                    tableData.push(data[item])
                })
                if (showLogs) console.table(tableData, ["title", "body"])
                return data;
            }

        }
        catch (error) {
            if (error == "SyntaxError: Unexpected end of JSON input")
                logger.warn("❎ List operation: List is empty! Nothing to show!", false)
            else
                logger.error(`❌ Error in list operation: ${error}`)
        }

    }

    show(operationDetail, showLogs = true) {
        try {
            if (Object.keys(operationDetail).includes("title")) {
                logger.heading(`🥁 Performing show operation for --> ${operationDetail.title}`, showLogs)
                logger.info(`🔎 Finding details for Title:${operationDetail.title}`, showLogs)
                const data = this.list(false)
                if (Object.keys(data).includes(operationDetail.title)) {
                    logger.info("🎉 Found the information", showLogs)
                    if (showLogs) console.table(data[operationDetail.title])
                    return data[operationDetail.title]
                }
                else {
                    logger.warn("❌ The item doesnt exist", showLogs)
                    return false
                }
            }

            else
                logger.warn("❌ Error in show operation: Title Not found", showLogs)

        }
        catch (error) {
            logger.error(`❌ Error in show operation: ${error}`)
        }


    }

    removeAll(showLogs = true) {
        try {
            logger.heading(`🥁 Performing remove all operation`, showLogs)
            fs.unlinkSync(fileName);
        }
        catch (error) {
            logger.error(`❌ Error in remove all operation:${error}`)
        }

    }

    removeOne(operationDetail, showLogs = true) {
        try {
            const allList = this.list(false)
            if (allList && Object.keys(operationDetail).includes("title")) {
                logger.heading(`🥁 Performing remove operation for --> ${operationDetail.title}`, showLogs)
                logger.info(`🕵️‍♂️ Checking if Title:${operationDetail.title} exists or not`, showLogs)
                const data = this.show(operationDetail, false)
                if (!data) {
                    logger.warn(`🙅 Element you are trying to delete doesnt exist`, showLogs)
                }
                if (data) {
                    logger.info(`🏃 Deleting the entry`, showLogs)
                    let allList = this.list(false)
                    delete (allList[data.title])
                    fs.writeFileSync(fileName, JSON.stringify(allList), (error) => {
                        if (error)
                            throw error
                    })
                }
            }

            else
                !allList ? logger.warn("❌ Error in remove operation:List is empty! Nothing to delete") : logger.warn("❌ Error in remove operation: Title Not found", showLogs)

        }
        catch (error) {
            logger.error(`❌ Error in remove operation: ${error}`)
        }

    }

    update(operationDetail, showLogs = true) {
        try {
            const allList = this.list(false)
            if (allList && Object.keys(operationDetail).includes("title") && (Object.keys(operationDetail).includes("new-title") || Object.keys(operationDetail).includes("new-body"))) {
                logger.heading(`🥁 Performing update operation for --> ${operationDetail.title}`, showLogs)
                logger.info(`♻️ Updating for Title:${operationDetail.title}`, showLogs)
                let data = this.show(operationDetail, false)
                this.removeOne(operationDetail, false)
                if (Object.keys(operationDetail).includes("new-title"))
                    data.title = operationDetail["new-title"]
                if (Object.keys(operationDetail).includes("new-body"))
                    data.body = operationDetail["new-body"]
                let allList = this.list(false)
                allList[data.title] = data;
                fs.writeFileSync(fileName, JSON.stringify(allList), (error) => {
                    if (error)
                        throw error
                })
            }
            else
                !allList ? logger.warn("❌ Error in update operation: List is empty! Nothing to update") : !operationDetail.title ? logger.error("❌ Error in update operation: Title Not found") : !operationDetail["new-title"] && !operationDetail["new-body"] ? logger.error("❌ Error in update operation: New body or title not found") : null
        }
        catch (error) {
            logger.error(`❌ Error in update operation: ${error}`)
        }

    }

    errorOperation(operation) {
        logger.error(`❌ Error: Invalid Operation --> ${operation}`)

    }
}

module.exports = new FileOperations()