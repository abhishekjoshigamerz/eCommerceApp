module.exports.home = function(req, res){
    console.log('Home Controller');
     res.render('login', {
        title: "Login"
    });
}