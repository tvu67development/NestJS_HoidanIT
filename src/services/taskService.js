const Task = require("../models/task");
const aqp = require('api-query-params');

module.exports = {
    createTaskService: async (taskData) => {
        if (taskData.type === "EMPTY-TASK") {
            let result = await Task.create(taskData)
            return result
        }
        return null
    },

    getTaskService: async (queryString) => {
        // console.log("queryString ", queryString)
        const page = queryString.page
        const { filter, limit } = aqp(queryString); // filter, limit trùng với tên của tham số có trong thư viện aqp nên có thể viết như vậy
        // trừ tất cả các tham số được định nghĩa sẵn trong thư viện aqp, các tham số thêm vào URL đều có trong filter: page, ... 
        // page là để dùng tính offset, nên cần loại ra khỏi biến filter
        let offset = (page - 1) * limit
        delete filter.page
        result = await Task.find(filter)
            .skip(offset)
            .limit(limit)
            .exec()
        return result
    },

    deleteTaskService: async (id) => {
        try {
            let result = await Task.deleteById({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },

    putUpdateTaskService: async (data) => {
        try {
            let result = await Task.updateOne({ _id: data.id }, { ...data })  // destructuring object
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}