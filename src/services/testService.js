import Test from "@models/test.js";

let createNewTest = async (data) => {
    try {
        const newTest = new Test({
            TestId: data.TestId,
            TestName: data.TestName,
            TestAge: data.TestAge,
            TestAdd: data.TestAdd,
        });

        await newTest.save();

        return {
            errCode: 0,
            message: "OK"
        };
    } catch (error) {
        console.error("Error creating test:", error);
        throw error;
    }
};

let getAllTests = async (TestId) => {
    try {
        let tests;

        if (TestId === 'ALL') {
            tests = await Test.find();
        } else {
            tests = await Test.find({ TestId: Number(TestId) });
        }

        return tests;
    } catch (error) {
        throw new Error(error.message);
    }
};

let updateTest = async (data) => {
    try {
        if (!data.TestId) {
            return {
                errCode: 2,
                errMessage: "Missing required parameter"
            };
        }

        let updatedTest = await Test.findOneAndUpdate(
            { TestId: data.TestId },
            {
                TestName: data.TestName,
                TestAge: data.TestAge,
                TestAdd: data.TestAdd
            },
            { new: true }
        );

        if (!updatedTest) {
            return {
                errCode: 1,
                message: "Test not found!"
            };
        }

        return {
            errCode: 0,
            message: "Test updated successfully!"
        };

    } catch (e) {
        throw e;
    }
};

let deleteTest = async (testId) => {
    try {
        const deletedTest = await Test.findOneAndDelete({ TestId: testId });

        if (!deletedTest) {
            return {
                errCode: 2,
                errMessage: "Test does not exist"
            };
        }

        return {
            errCode: 0,
            message: "Test deleted successfully!"
        };

    } catch (e) {
        throw e;
    }
};

export default {
    createNewTest,
    getAllTests,
    updateTest,
    deleteTest
};
