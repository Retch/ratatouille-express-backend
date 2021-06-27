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
			allowNull: true,
			unique: true
		},
		password: Sequelize.STRING(512)
	});

	return Account;
}
