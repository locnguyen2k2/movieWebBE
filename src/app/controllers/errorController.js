const error404 = (req, res) => {
    const data = {};
    data.sub_content = '404'    
    data.content = "Page Not Found";
    
    res.render('layouts/error', { data: data });
}

export default {
    error404
};