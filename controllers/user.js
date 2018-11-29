const User = require('../models/User');
const md5 = require('md5');
const mongoose = require('mongoose');

/**
 * API for List of User.
 */
exports.list = function (req, res, next) {
    User.find().withTrashed().exec((err, docs) => {
        return (err || !docs) 
            ? res.json({result: [],status: "RESULT_EMPTY"}) 
            : res.json({result: docs,status: (docs.length > 0) ? "RESULT_OK" : "RESULT_EMPTY"});
    })
};

/**
 * API for Create User.
 */
exports.create = function (req, res, next) {
    if (req.params.password != req.params.confirm_password) {
        return res.json(417, {message: `Password not match`,status: "error_confirm"});
    }
    let password = md5(req.params.password);
    let newUser = new User({
        username : req.params.username,
        email : req.params.email,
        name : req.params.name,
        age : req.params.age,
        password : password
    });
    return newUser.save((err, user) => {
        if (err) {
            res.json(417, {message: `User failed to Create`,errors: (err.errors) ? err.errors : err,status: "ERROR"});
        } else { 
            res.json(200, {message: `User successfully Created`,result : user,status: "RESULT_OK"});
        }
    });
};

/**
 * API for details of User by ID.
 */
exports.details = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.json(417, {message: `ID Not Valid`,status: "ERROR"});
	}
    let userId = req.params.id;
    User.findById(userId).withTrashed().exec((err, docs) => {
        if(err) { return res.json(417,{error : err, status : 'ERROR_DB'})};
        return (!docs) 
        ? res.json(200,{message : 'User Not Found',result : {},status : 'NOT_FOUND'}) 
        : res.json(200,{result : docs,status : 'RESULT_OK'});
    })
};

/**
 * API for Update User by ID.
 */
exports.update = function (req, res, next) {
    // ObjectID Validation.
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.json(417, {message: `ID Not Valid`,status: "ERROR"});
	}
    let userId = req.params.id;
    let userUpdate = {
        email : req.params.email,
        name : req.params.name,
        age : req.params.age,
    }
    User.findById(userId).withTrashed().exec((err, user) => {
        if(err) { return res.json(417,{error : err, status : 'ERROR_DB'})};
        if(!user) { return res.json(417,{message : 'User Not Found', status : 'NOT FOUND'})}
        Object.assign(user, userUpdate).save((err, user) => {
            if (err) {
                res.json(417, {message: `User failed to Create`,errors: (err.errors) ? err.errors : err,status: "ERROR"});
            } else { 
                res.json(200, {message: `User successfully Updated`,result : user,status: "RESULT_OK"});
            }
        });
    })
};

/**
 * API for Soft Delete User.
 */
exports.softDelete = function (req, res, next) {
	// ObjectID Validation.
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.json(417, {message: `ID Not Valid`,status: "ERROR"});
	}
	
	User.deleteById(req.params.id, function (err, result) {
		if(err) { return res.json(417,{error : err, status : 'ERROR_DB'})};
		
		if (result.n === 0) return res.json(200, { message: `User Not found.`, status: "NOT_FOUND" });
		return (result.ok === 1)
			? res.json(200, {message: `User Successfully Deleted`,result : result,status: "RESULT_OK"})
			: res.json(417, { message: `User failed to delete`,status: "ERROR"});
	});
};