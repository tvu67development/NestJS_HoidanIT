const { createProjectService, getProject, deleteProjectService, putUpdateProjectService } = require("../services/productService");

module.exports = {
    postCreateProject: async (req, res) => {
        // destructing object js
        // console.log(">>> check req ", req.body)
        // let customerInfor = { name: req.body.customerInfor.name, phone: req.body.customerInfor.phone, email: req.body.customerInfor.email }
        // let leader = { name: req.body.leader.name, email: req.body.leader.email }
        // let { name, startDate, endDate, description } = req.body
        // let projectData = { name, startDate, endDate, description, customerInfor, leader }
        // console.log(">>> check projectData ", projectData)


        // let customerData = { name, address, phone, email, description, image: imageURL }
        let project = await createProjectService(req.body)
        return res.status(200).json({
            EC: 0,
            data: project
        })
    },

    getAllProject: async (req, res) => {
        let project = await getProject(req.query)
        return res.status(200).json({
            EC: 0,
            data: project
        })
    },

    putUpdateProject: async (req, res) => {
        let { id, name, startDate, endDate, description } = req.body
        let project = await putUpdateProjectService(id, name, startDate, endDate, description)
        if (project) {
            return res.status(200).json({
                EC: 0,
                data: project
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: null
            })
        }
    },

    deleteProject: async (req, res) => {
        let id = req.body.id
        // console.log(id)
        let project = await deleteProjectService(id)
        return res.status(200).json({
            EC: 0,
            data: project
        })
    },
}
