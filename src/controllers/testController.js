import testService from "@services/testService.js"
import { authenticate, authorize } from "@middleware/auth.js";

let handleCreateNewTest = async (req, res) => {
    let message = await testService.createNewTest(req.body);
    return res.status(200).json(message);
}

let handleGetAllTests = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            tests: []
        })
    }

    let tests = await testService.getAllTests(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        tests
    })
}

let handleUpdateTest = async (req, res) => {
    let data = req.body;
    let message = await testService.updateTest(data);
    return res.status(200).json(message);
}

let handleDeleteTest = async (req, res) => {
    if (!req.body.TestId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }

    let message = await testService.deleteTest(req.body.TestId);
    return res.status(200).json(message);
}

export default {
    handleCreateNewTest,
    handleGetAllTests,
    handleUpdateTest,
    handleDeleteTest
};