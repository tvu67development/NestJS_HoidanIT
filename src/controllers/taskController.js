const { createTaskService, getTaskService, deleteTaskService, putUpdateTaskService } = require("../services/taskService");

module.exports = {
    postCreateTask: async (req, res) => {
        let task = await createTaskService(req.body)
        return res.status(200).json({
            EC: 0,
            data: task
        })
    },

    getAllTask: async (req, res) => {
        // console.log(">>> check ", req.query)
        let task = await getTaskService(req.query)
        return res.status(200).json({
            EC: 0,
            data: task
        })
    },

    putUpdateTask: async (req, res) => {
        // let { id, name, startDate, endDate, description, status } = req.body

        let task = await putUpdateTaskService(req.query)
        if (task) {
            return res.status(200).json({
                EC: 0,
                data: task
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: null
            })
        }
    },

    deleteTask: async (req, res) => {
        let id = req.body.id
        // console.log(id)
        let task = await deleteTaskService(id)
        return res.status(200).json({
            EC: 0,
            data: task
        })
    }
}
