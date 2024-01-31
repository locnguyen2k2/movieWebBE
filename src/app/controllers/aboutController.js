const data = {};
data.session = {};
const index = (req, res) => {
    data.sub_content = 'about';
    data.content = 'about';
    data.items = [];
    if (req.session.user) {
        data.session.user = req.session.user;
    } else {
        delete data.session.user;
    }
    return res.render('layouts/main', { data: data });
}

export default {
    index,
}