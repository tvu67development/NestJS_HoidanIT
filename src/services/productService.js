const Project = require("../models/project");
// const aqp = require('api-query-params');

module.exports = {
    createProjectService: async (projectData) => {
        console.log(">>> check: ", projectData)
        if (projectData.type === "EMPTY-PROJECT") {
            let result = await Project.create(projectData)
            return result
        }

    }
}