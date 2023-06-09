const Users = require('../../models/users/users');
const bcrypt = require('bcryptjs');
const short = require('short-uuid');
exports.create = async (data) => {
    const uuid = short.generate();
    data = {
        ...data,
        email: data.email.toLowerCase(),
        nickname: data.nickname.toLowerCase(),
        name: data.name.toLowerCase(),
        idRype: uuid,
        url: data.url,
        profileImage: '',
        urlCover: './assets/img/account/cover-1.jpg',
    }
    var user = new Users(data);
    await user.save();
    return user;
};

exports.getRegister = async (email, cpf) => {
    const data = await Users.find({ email, cpf });
    if (data.length != 0) {
        return true
    }
    return false;
}

exports.get = async () => {
    const res = await Users.find();
    return res;
};

exports.getByid = async (id) => {
    const user = await Users.findById(id).populate(['team', 'social']);
    return user;
};

exports.updateUser = async (id, data) => {
   
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            nickname: data.nickname.toLowerCase(),
            name: data.name.toLowerCase(),
            lastname: data.lastname?.toLowerCase(),
            cpf: data.cpf,
            phone: data.phone,
            birthday: data.birthday,
            country: data.country,
            roles: data.roles,
            verify: data.verify,
            gender: data.gender,
            social: {
                facebook: data.social?.facebook,
                youtube: data.social?.youtube,
                instagram: data.social?.instagram,
                discord: data.social?.discord,
                twitter: data.social?.twitter,
                twitch: data.social?.twitch,
                psn: data.social?.psn,
                xbox: data.social?.xbox,
                idGame: data.social?.idGame,
            },
            address: {
                city: data.address?.city,
                district: data.address?.district,
                number: data.address?.number,
                street1: data.address?.street1,
                street2: data.address?.street2,
                zipcode: data.address?.zipcode,
            },
        },
    }, { new: true });

    return user;
}

exports.deleteUser = async (id) => {
    const user = await Users.findByIdAndDelete(id);

    return user;
}

exports.updatePass = async (id, data) => {
    const password = await bcrypt.hash(data.newpassword, 15);
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            password: password,
        },
    }, { new: true });
    return user;
}

exports.checkUpdatePass = async (email) => {
    const user = await Users.findOne({ email }).select('+password');
    return user;
};



exports.deleteImg = async (id) => {
    profileImage = '';
    url = '';
    const user = await Users.findOneAndUpdate(id, {
        $set: {
            profileImage,
            url,
        },
    }, { new: true });

    return user;
}

exports.getSearchKey = async (key) => {

    let data = await Users.find({
        $or: [
            { name: { $regex: key } },
            { email: { $regex: key } },
            { nickname: { $regex: key } }
        ]
    }).populate(['team']);
    if (data.length < 0) {
        let message = 'Nenhum usuário encontrado com esse nome'
        return message;
    }
    return data;
}