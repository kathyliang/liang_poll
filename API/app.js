var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
// var poll_topic	= require('./models/poll_topic');
var poll_question	= require('./models/poll_question');
var userLogin		= require('./models/userLogin');
var app 		= express();
app.use(cors());
app.use(bodyParser.json());


app.listen(3011,function() {
	console.log('node_test listening on 3011');
});

app.post('/angular',function(req,res) {
	console.log(req.body)

	var hello  = {}
	hello.hello = "world"
	res.status(200).send(hello);
})

app.get('/angular',function(req,res) {
	var hello  = {}
	hello.hello = "world"
	res.status(200).send(hello);

})
app.get('/get_form',function(req,res) {
	// var fid = req.headers.fid
	
	poll_question.get_form()
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
	

})
app.get('/get_form_amount',function(req,res) {
	
	poll_question.get_form_amount()
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
	

})
// app.post('/set_topic',function(req,res) {
// 	var poll_data = req.body;
// 	var kid = poll_data.kid;
// 	var topic = poll_data.topic;
// 	console.log(kid);

// 	poll_topic.set_topic(kid, topic)
// 		.then(function(result) {
// 			console.log(result)
// 			res.status(200).send(result);
// 		})
// 		.catch(function(error) {
// 			console.log(error)
// 			res.status(401).send(error);
// 		});

// })
// app.post('/get_topic',function(req,res) {
// 	var poll_data = req.body;
// 	var kid = poll_data.kid;
// 	// var topic = poll_data.topic;
// 	console.log(kid);

// 	poll_topic.get_topic(kid)
// 		.then(function(result) {
// 			console.log(result)
// 			res.status(200).send(result);
// 		})
// 		.catch(function(error) {
// 			console.log(error)
// 			res.status(401).send(error);
// 		});

// })
// app.post('/set_des',function(req,res) {
// 	var poll_data = req.body;
// 	var kid = poll_data.kid;
// 	var des = poll_data.des;
// 	console.log(kid);

// 	poll_topic.set_des(kid, des)
// 		.then(function(result) {
// 			console.log(result)
// 			res.status(200).send(result);
// 		})
// 		.catch(function(error) {
// 			console.log(error)
// 			res.status(401).send(error);
// 		});

// })

// app.post('/get_des',function(req,res) {
// 	var poll_data = req.body;
// 	var kid = poll_data.kid;
// 	// var topic = poll_data.topic;
// 	console.log(kid);

// 	poll_topic.get_des(kid)
// 		.then(function(result) {
// 			console.log(result)
// 			res.status(200).send(result);
// 		})
// 		.catch(function(error) {
// 			console.log(error)
// 			res.status(401).send(error);
// 		});

// })
app.post('/set_form',function(req,res) {
	var poll_data = req.body;
	// var kid = poll_data.kid;
	// var kid = 0;
	var form_content = poll_data;
	// console.log("in there");

	poll_question.set_form(form_content)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/set_answer',function(req,res) {
	var ans_content = req.body;
	// console.log("API",ans_content);
	// ans_content.question = 
	poll_question.set_answer(ans_content)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})


app.post('/get_form',function(req,res) {
	var poll_data = req.body;
	var id = poll_data.key;

	poll_question.get_form(id)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})