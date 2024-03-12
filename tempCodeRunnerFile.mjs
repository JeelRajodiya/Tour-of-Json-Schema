import tv4 from "tv4"


tv4.setErrorReporter(function (error, data, schema) {
	  console.log(error);
});


var valid = tv4.validate(data, schema);

console.log(valid);