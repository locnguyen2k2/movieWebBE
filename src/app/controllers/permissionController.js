import permissionModel from '../models/permissionModel';
import roleModel from '../models/roleModel';
import userModel from '../models/userModel';

const data = {};
data.session = {};
const updatePermission = async (req, res) => {
    data.sub_content = 'permissions/updatePermission';
    data.content = 'update-permission-form';
    data.title = 'Cấu hình quyền';
    if (req.session.user) {
        data.session.user = req.session.user;
        if (req.method === 'POST') {
            if (req.body.permissionID && req.body.userID && req.body.roleID) {
                const { permissionID, userID, roleID } = req.body;
                await permissionModel.updatePermission(permissionID, userID, roleID);
                return res.redirect('/list-user');
            }
            return res.redirect('/');
        }
        const permission = await permissionModel.getPermissionByID(req.params.permissionID);
        const user = await userModel.getUserByID(permission.userID);
        const roles = await roleModel.listRole();
        data.permission = permission;
        data.user = user;
        data.roles = roles;
        return res.render('layouts/main', { data: data });
    } else {
        delete data.session.user;
        res.redirect('/login');
    }
}

export default {
    updatePermission,
}