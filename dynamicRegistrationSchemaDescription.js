// require mongoose
var mongoose = require('mongoose');

var descriptionschema = mongoose.Schema({
  // storing the data according to considering the single user
  key: {
    type: String,
    required: true
  },
  // user form data will be stored in this values and for single user number of forms can in stored here
  values:[{
    // user / creator naem
    creatorName: {
      type: String,
      required: true
    },
    // form name
    formName: {
      type: String,
      required: true
    },
    // form description
    formDescription: {
      type: String,
      required: true
    },
    // form generating date
    formgeneratedDate: {
      type: String,
      required: true
    },
    // creating of a form data
    formgeneratedData: [{
      _id: {
        type: String,
        required: true
      },
      text: [{
        _id: {
          type: String
        }
      }],
      textarea: [{
        _id: {
          type: String
        }
      }],
      button: [{
        _id: {
          type: String
        }
      }],
      checkbox: [{
        _id: {
          type: String
        }
      }],
      select: [{
        _id: {
          type: String
        }
      }]
    }]
  }]
});

// creating a model to the schema
var descriptionmodel = module.exports = mongoose.model('descriptionmodel', descriptionschema);

// finding the userform already exists in the datbase or Not
module.exports.findCreatorNameData = function(data, callback) {
  console.log(data)
  descriptionmodel.findOne({key : data.key}, function(error, data) {
    if(data) {
        var datafield = data.values[0].creatorName;
        descriptionmodel.findOne({datafield: data.formName}, callback);
    }
    else {
        console.log('hahah');
        callback();
    }
  });
}

// updating/creating description data in  to the table
module.exports.createData = function(data, callback) {
  descriptionmodel.create(data, callback);
}
