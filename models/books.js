module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
        user: DataTypes.STRING,
        email: DataTypes.STRING,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        genre: DataTypes.STRING,
        copyright_date: DataTypes.DATE,
        cover_art_url: DataTypes.STRING,
        ISBN: DataTypes.STRING,
        synopsis: DataTypes.STRING(10000),
        status: {type: DataTypes.ENUM,
                values: ['to read', 'currently reading', 'previously read']
                }
    });
    return Books;
}
