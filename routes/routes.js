exports.index = (req,res) => {
    res.render("index", {
        "title": "Home"
    });
};

exports.form = (req, res) => {
    res.render("form", {
        "title": "Form"
    });
};