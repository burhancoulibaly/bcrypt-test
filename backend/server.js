var logger       = require('morgan'),
	cors         = require('cors'),
	http         = require('http'),
	express      = require('express'),
	errorhandler = require('errorhandler'),
	dotenv 		 = require('dotenv'),
	bodyParser   = require('body-parser'),
	request      = require('request'),
	bcrypt		 = require('bcryptjs'),
	salt = bcrypt.genSaltSync(10),
	count		 = 0,
	li			 = 0;

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err,req,res,next){
	if(err.name === 'StatusError'){
		res.send(err.status, err.message);
	}else{
		next(err);
	}
	res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
});
request.method === 'OPTIONS'

if(process.env.NODE_ENV === 'development'){
	app.use(logger('dev'));
	app.use(errorhandler());
};

const Sequelize = require("sequelize");
const connection = new Sequelize("User","","",{
	dialect: 'sqlite',

	storage:'./backend/User.db'
});

var Articles = connection.define('USER',{
	Username:{
		type:Sequelize.STRING,
		allowNull:true,
	},
	Password:{
        type:Sequelize.STRING,
        allowNull: true,
    },
   }, {
    freezeTableName: true 
});

connection.sync();

app.post('/bcrypt', (req,res)=>{
	var username = req.body.username;
	var password = bcrypt.hashSync(req.body.password, salt);
	connection.sync().then(()=>{
		Articles.create({
			Username:username,
			Password:password,
		});
	});
	res.send("success");
});

var port = process.env.PORT || 3002;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});