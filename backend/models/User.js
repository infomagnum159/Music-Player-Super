const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const user = await User.findOne({username: value});

                if (user) return false;
            },
            message: 'This user is already registered',
        }
    },
    password: {
        type: String,
        required: true

    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);

};
UserSchema.methods.generateToken = function() {
    this.token = nanoid();
}

const User = mongoose.model( 'User', UserSchema);
module.exports = User;