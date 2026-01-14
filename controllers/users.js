const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup= async(req,res)=>{
    //use try catch to just flash the error msg and stay on same page
    try{
        let {username,email,password} = req.body;
        const newUser = new User({
            email:email,
            username:username,
        });
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);

        // Automatically login after signup
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to BookMyStay");
            return res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup") ;
    }

};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    //use try catch to just flash the error msg and stay on same page
    req.flash("success","Welcome back to BookMyStay !");

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};