// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
  var NewUser = sequelize.define("newUser", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pet_types: {
      type: DataTypes.STRING
    },
    pet_names: {
      type: DataTypes.STRING
    }
  });

  NewUser.associate = function (models) {
    //associating users with events
    //when author is deleted - it will also delete their created events
    NewUser.hasMany(models.Events, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  NewUser.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  NewUser.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return NewUser;
};
