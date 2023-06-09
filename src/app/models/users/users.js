const mongoose = require('../../database/DataBaseConnection');
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
    idRype: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    cpf: {
        type: Number,
        required: false,
    },
    phone: {
        type: Number,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    verify: {
        type: Boolean,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    roles: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'producer'],
        default: 'user'
    },
    privacyTerm: {
        type: Boolean,
        required: true,
        default: true,
    },
    profileImage: {
        type: String,
        require: false,
    },
    urlCover: {
        type: String,
        require: false,
    },
    social: {
        discord: {
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        },
        youtube: {
            type: String,
            required: false
        },
        twitter: {
            type: String,
            required: false
        },
        twitch: {
            type: String,
            required: false
        },
        psn: {
            type: String,
            required: false
        },
        xbox: {
            type: String,
            required: false
        },
        idGame: {
            type: String,
            required: false
        }
    },
    address: {
        city: {
            type: String,
            required: false
        },
        district: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        street1: {
            type: String,
            required: false
        },
        street2: {
            type: String,
            required: false
        },
        zipcode: {
            type: String,
            required: false
        }
    },
    line: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lines',
    }],
    url: {
        type: String,
        required: false
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notifications',
    }],
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

UsersSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 15);
    this.password = hash;

    this.roles = ['user'];

    next();
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;