const bcrypt = require("bcrypt");

const password = "";
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (err, salt) {
	bcrypt.hash(password, salt, function (err, hash) {
		console.log(err, hash);
	});
});
