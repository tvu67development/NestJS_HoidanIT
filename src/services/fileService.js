
const uploadSingleFile = async (fileObject) => {
    let uploadPath = __dirname + fileObject.name;

    try {
        await fileObject.mv(uploadPath);
        return {
            status: 'success',
            path: uploadPath,
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
const uploadMultipleFile = () => {

}

module.exports = {
    uploadSingleFile, uploadMultipleFile
}