import userService from "@services/userService.js"

let handleLogin = async (req, res) => {
    let email = req.body.Email;
    let password = req.body.UserPassword;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
        token: userData.token || null
    })
}

let handleGetAllUsers = async (req, res) => {
    try {
        let users = await userService.getAllUsers();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMessage: error.message,
            users: []
        });
    }
};

let handleGetUserById = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        });
    }

    try {
        let user = await userService.getUserById(id);
        if (user) {
            return res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                user
            });
        } else {
            return res.status(404).json({
                errCode: 2,
                errMessage: 'User not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMessage: error.message
        });
    }
};

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleUpdateUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let userId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await userService.deleteUser(userId);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let forgotPassword = async (req, res) => {
    let email = req.body.Email || "test@example.com";

    let result = await userService.sendResetPasswordEmail(email);
    return res.status(200).json(result);
};

let resetPassword = async (req, res) => {
    let { token, newPassword } = req.body;
    let result = await userService.resetPassword(token, newPassword);
    return res.status(200).json(result);
};

export default {
    handleLogin,
    handleGetAllUsers,
    handleGetUserById,
    handleCreateNewUser,
    handleUpdateUser,
    handleDeleteUser,
    forgotPassword,
    resetPassword
};