const db = require('../config/db.config.js');
const Account = db.accounts;

exports.create = (req, res) => {	
	Account.create({  
			email: req.body.email,
			password: req.body.password
		})
		.then(account => {		
			res.json(account);
		})
		.catch(error => res.status(400).send(error))
};
 
exports.findAll = (req, res) => {
	Account.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] }
		})
		.then(accounts => {
			res.json(accounts);
		})
		.catch(error => res.status(400).send(error))
};

exports.findById = (req, res) => {	
	Account.findById(req.params.accountId,
				{attributes: { exclude: ["createdAt", "updatedAt"] }}
			)
			.then(account => {
					if (!account){
						return res.status(404).json({message: "Customer Not Found"})
					}
					return res.status(200).json(account)
				}
			)
			.catch(error => res.status(400).send(error));
};
 
exports.update = (req, res) => {
	return Account.findById(req.params.accountId)
		.then(
			account => {
				if(!account){
					return res.status(404).json({
						message: 'Customer Not Found',
					});
				}
				return account.update({
										name: req.body.name,
										age: req.body.age
									})
									.then(() => res.status(200).json(account))
									.catch((error) => res.status(400).send(error));
				}
			)
		.catch((error) => res.status(400).send(error));			 
};
 
exports.delete = (req, res) => {
	return Account
					.findById(req.params.accountId)
					.then(account => {
						if(!account) {
							return res.status(400).send({
								message: 'Account Not Found',
							});
						}

						return account.destroy()
														.then(() => res.status(200).json({message: "Destroy successfully!"}))
														.catch(error => res.status(400).send(error));
					})
					.catch(error => res.status(400).send(error));
};
