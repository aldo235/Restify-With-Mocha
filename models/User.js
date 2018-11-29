const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true, hideJSON: true },
	username: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function(v) {
				return /^[a-z0-9A-Z.]{1,50}$/.test(v);
			}, message: 'Invalid username. Username must be 5-25 characters consist of string or number. Special character is not allowed except dot (.)'
		}
	},
	active: { type: Boolean, default: true },
	name: { type: String, required: true },
	age: { type: Number, required: false }
}, {
	collection: 'users',
	versionKey: false,
	timestamps: true
});
/**
 * Delete document of User by Id with default searches without any data that has been removed (trashed).
 *
 * @param {Schema.ObjectId} id
 * @param {Object} [options] optional
 * @param callback
 * @returns {Promise|RegExpExecArray}
 */
userSchema.statics.deleteById = function(id, options, callback){
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	
	return this.updateOne({ _id: id}, { $set: { active: false } }).withTrashed().exec(callback);
};
/**
 * Scope a query to only include user of a given `status` of soft delete.
 *
 * @param {Boolean} [val=false]
 * @returns {*}
 */
userSchema.query.withTrashed = function (val = false) {
	return (val === true)
		? this
		: this.where({ active: true });
};

const User = mongoose.model('User', userSchema);

module.exports = User;