/**
 * http://usejsdoc.org/
 */
var Ajv = require('ajv');
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

var dictionary = [];

var schema = {
  "type": "array",
  "allOf": [
    {
	  "contains": {
  		"type": "object",
  		"properties": {
  		  "n": {
  		    "type": "string",
  		    "const": "5700"
  		  },
  		  "vb": {
  		    "type": "boolean",
  		    "@type": "iot:SwitchData"
  		  }
  		},
  		"required": ["n", "vb"]
      }
    },
    {
      "contains": {
  		"type": "object",
  		"properties": {
  		  "n": {
  		    "type": "string",
  		    "const": "5750"
  		  },
  		  "vs": {
  		    "type": "string",
  		    "@type": "iot:ApplicationTypeData"
  		  }
  		},
  		"required": ["n", "vs"]
      }
    }
  ]
};

var instance = [
  {
    "n": "5700",
    "vb": true
  },
  {
	"n": "5750",
	"vs": "tester"
  }
];

function validate(schema, instance, path) {
	
	if ( undefined  == path ) {
		path = "";
	}	
	
	// Validate JSON type of the instance
	
	if ('number' == schema['type']) {
		if (typeof(instance) == "number") {
			//console.log('number');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				dictionary.push( Object.assign({'path':path}, schema) );
			}
			return true;
		}
		else {
			//console.log('not number');
			return false;
		}
	};
	
	if ('string' == schema['type']) {
		if (typeof(instance) == "string") {
			//console.log('string');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				dictionary.push( Object.assign({'path':path}, schema) );
			}
			return true;
		}
		else {
			//console.log('not string');
			return false;
		}
	};
	
	if ('boolean' == schema['type']) {
		if (typeof(instance) == "boolean") {
			//console.log('boolean');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				dictionary.push( Object.assign({'path':path}, schema) );
			}
			return true;
		}
		else {
			//console.log('not boolean');
			return false;
		}
	};
	
	if ('object' == schema['type']) {
		if (typeof(instance) == "object" && ! Array.isArray(instance) ) {
			//console.log('object');
		}
		else {
			//console.log('not object');
		}
	};
	
	if ('array' == schema['type']) {
		if (Array.isArray(instance) ) {
			//console.log('array');
		}
		else {
			//console.log('not array');
		}
	};
	
	// Apply one or more schemas to the instance
	
	if (schema['anyOf']) {
		//console.log('anyOf');
		schema['anyOf'].forEach(function (subschema) {
			validate(subschema, instance, path);
			} );
	};
	
	if (schema['allOf']) {
		//console.log('allOf');
		schema['allOf'].forEach(function (subschema) {
			validate(subschema, instance, path);
			} );
	};
	
	if (schema['oneOf']) {
		//console.log('oneOf');
		schema['oneOf'].forEach(function (subschema) {
			validate(subschema, instance, path);
			} );
	};
	
	// apply a schema to one or more items or properties in the instance
	
	if (schema['items']) {
		//console.log('items');
		if (schema['additionalItems']) {
			//console.log('additionalItems');
		};
	};
	
	if (schema['contains']) {
		//console.log('contains');
		var index = 0;
		instance.forEach(function (item) {
			validate(schema['contains'], item, path + '/' + index.toString() );
			index +=1;
		});
	};
	
	if (schema['properties']) {
		//console.log('properties');
		for ( var property in schema['properties']) {
			if (property in instance) {
				if ( validate( schema['properties'][property], 
						instance[property], 
						path + '/' + property) ) {
				}
			}
		}
	};
	
	if (schema['additionalProperties']) {
		//console.log('additionalProperties');
	};
	
	return;
}


function get(filter) 
// return the value in a dictionary that includes a value property
{
	for (index in dictionary) {
		for( var filterkey in filter ) {
			if (filterkey in dictionary[index] && filter[filterkey] == dictionary[index][filterkey]) {
				return Object.assign( 
						{'value': Pointer.get(instance, dictionary[index].path)}, 
						dictionary[index]);
			};
		};
	};
};

function set(filter) 
// update the value based on a filter spec with a value property
{
	for (index in dictionary) {
		for( var filterkey in filter ) {
			if (filterkey in dictionary[index] && filter[filterkey] == dictionary[index][filterkey]) {
				Pointer.set(instance, dictionary[index].path, filter.value);
				return;
			};
		};
	};
};

//
// check with ajv for actual validation
var valid = ajv.validate(schema, instance);
console.log('ajv valid: ', valid);
if (!valid) 
	console.log(ajv.errors);
console.log();

// enumerate instance properties
var Pointer = require('json-pointer');
console.log(Pointer.dict(instance));
console.log();

// run validator-indexer
validate(schema, instance);

// display the dictionary
console.log(dictionary);
console.log();

// get function
console.log('>>> console.log(get({"@type": "iot:ApplicationTypeData"}).value);');
console.log(get({"@type": "iot:ApplicationTypeData"}).value);
console.log();

// set function
console.log('>>> set({"@type": "iot:ApplicationTypeData", "value": "Light Bulb"});');
set({"@type": "iot:ApplicationTypeData", "value": "Light Bulb"});
console.log();

console.log('>>> console.log( get({"@type": "iot:ApplicationTypeData"}).value );');
console.log( get({"@type": "iot:ApplicationTypeData"}).value );
