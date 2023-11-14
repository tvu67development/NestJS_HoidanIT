const Project = require("../models/project");
const aqp = require('api-query-params');

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

        if (projectData.type === "REMOVE-USERS") {
            let myProject = await Project.findById(projectData.projectID).exec()
            projectData.usersArr.forEach(element => {
                myProject.usersInfor.pull(element)
            });

            let newResult = await myProject.save()
            return newResult
        }
        return null
    },

    getProject: async (queryString) => {
        console.log("queryString ", queryString)
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString); // filter, limit trùng với tên của tham số có trong thư viện aqp nên có thể viết như vậy
        // trừ tất cả các tham số được định nghĩa sẵn trong thư viện aqp, các tham số thêm vào URL đều có trong filter: page, ... 
        // page là để dùng tính offset, nên cần loại ra khỏi biến filter
        let offset = (page - 1) * limit
        delete filter.page
        result = await Project.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec()
        return result
    },

    deleteProjectService: async (id) => {
        try {
            let result = await Project.deleteById({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },

    putUpdateProjectService: async (id, name, startDate, endDate, description) => {
        try {
            let result = await Project.updateOne({ _id: id }, { name, startDate, endDate, description })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}