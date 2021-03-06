module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        profile_pic: DataTypes.STRING,
        user: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
    });
    return User;
}