module.exports = (sequelize, Sequelize) => {
	const Account = sequelize.define('Account', {
		id: {
            type : Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
		email: {
			type: Sequelize.STRING(300),
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING(512),
			allowNull: false,
			unique: false
		},
		pictureurl: {
			type: Sequelize.STRING(512),
			allowNull: true,
			unique: false
		},
	});

	return Account;
}
