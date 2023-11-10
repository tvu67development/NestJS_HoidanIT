const Project = require("../models/project");
// const aqp = require('api-query-params');

module.exports = {
    createProjectService: async (projectData) => {
        if (projectData.type === "EMPTY-PROJECT") {
            let result = await Project.create(projectData)
            return result
        }
        if (projectData.type === "ADD-USERS") {
            console.log(">>> check: ", projectData)
            // find Project by ID
            let myProject = await Project.findById(projectData.projectID)
            console.log(">> projectData.usersArr ", projectData.usersArr)
            projectData.usersArr.forEach(element => {
                myProject.usersInfor.push(element)
            });
            // myProject.usersInfor.push(...projectData.usersArr)  // push tất cả phần tử có trong array vào 
            let newResult = await myProject.save()

            console.log(">>> check Project: ", myProject)
            // projectData.find()
            return newResult
        }
        return null
    }
}