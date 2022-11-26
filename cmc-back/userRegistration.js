const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  httpOptions: {
    timeout: 50000
  }
});

class Response {
  constructor() {
    this.responseObject = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 200,
      body: "",
    };
  }

  set statusCode(statusCode) {
    this.responseObject.statusCode = statusCode;
  }

  set body(bodyObject) {
    this.responseObject.body = JSON.stringify(bodyObject);
  }

  toObject() {
    return this.responseObject;
  }
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    let response = new Response();
    
    // Check if user already exists
    const userParams = {
        TableName: `Users`,
        Key: {
          '_id': data.user
        },
    };
    try {
        let client = await ddb.get(userParams).promise();
        if (!isEmptyObject(client)) {
            response.statusCode = 400;
            response.body = { message: "El usuario ya esta registrado"};
            return response.toObject();
        }
    } catch (error) {
        console.error(error);
        response.statusCode = 400;
        response.body = { message: "Algo ocurrió", error: error };
        return response.toObject();
    }
    // Replace user parameter with _id
    data._id = data.user;
    delete data.user;
    
    // Register user once validation passed
    const registerClientParam = {
            TableName: `Users`,
            Item: data,
    }; 
    try {
        await ddb.put(registerClientParam).promise();
        response.statusCode = 200;
        response.body = { message: "El usuario se registró correctamente" };
        return response.toObject();
  } catch (error) {
        console.error(error);
        response.statusCode = 400;
        response.body = { message: "Algo ocurrió", error: error };
        return response.toObject();
  }
};
