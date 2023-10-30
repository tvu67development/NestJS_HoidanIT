const path = require("path"); // fs: file system

const uploadSingleFile = async (fileObject) => {
    // Cach 1:
    // let uploadPath = path.join('./src', 'public/images/upload/') + fileObject.name;
    // Cach 2:
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    // console.log(uploadPath)
    // get file extension name
    let extName = path.extname(fileObject.name)
    // console.log(extName)
    // get file base name (without extension name)
    let baseName = path.basename(fileObject.name, extName)
    // console.log(baseName)
    let fileName = `${baseName}-${Date.now()}${extName}`
    let fileUploadPath = `${uploadPath}/${fileName}`
    try {
        await fileObject.mv(fileUploadPath);
        return {
            status: 'success',
            path: fileName,
            error: null
        }
    } catch (error) {
        console.log(">>> check err: ", error)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }

}

// Trong file "...Service.js", ko truyền "req" vs "res" vào  
const uploadMultipleFiles = async (fileObjects) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        let resultArr = []
        let countSuccess = 0;
        // get file extension name
        await fileObjects.forEach(element => {
            let extName = path.extname(element.name)
            let baseName = path.basename(element.name, extName)
            let fileName = `${baseName}-${Date.now()}${extName}`
            let fileUploadPath = `${uploadPath}/${fileName}`
            try {
                element.mv(fileUploadPath);
                resultArr.push({
                    status: "success",
                    path: fileUploadPath,
                    fileName: element.name,
                    error: null
                })
                countSuccess++;
            } catch (error) {
                resultArr.push({
                    status: "failed",
                    path: null,
                    fileName: element.name,
                    error: JSON.stringify(error)
                })
            }
        });
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error) {

    }

    // console.log(extName)
    // get file base name (without extension name)
    // console.log(baseName)
}

module.exports = {
    uploadSingleFile, uploadMultipleFiles
}