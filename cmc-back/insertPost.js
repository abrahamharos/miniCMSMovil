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

    // Check not null author
    if (!data.author) {
        response.statusCode = 400;
        response.body = {message: "Post author was not defined."};
        return response.toObject();
    }
    
    // Check not null  Message
    var postMessage = null;
    if (!data.message) {
        response.statusCode = 400;
        response.body = {message: "Post message was not defined."};
        return response.toObject();
    }

    // Timestamp - Server timezone must be configured
    data.timestamp = Date.now();

    // Title
    var postTitle = null;
    if (!data.title) {
        response.statusCode = 400;
        response.body = {message: "Post title was not defined."};
        return response.toObject();
    }
    
    // Generate a new post uuid
    data._id = AWS.util.uuid.v4();

    // Register user once validation passed
    const registerClientParam = {
            TableName: `Posts`,
            Item: data,
    }; 
    try {
        await ddb.put(registerClientParam).promise();
        response.statusCode = 200;
        response.body = { message: "El post se registró correctamente" };
        return response.toObject();
  } catch (error) {
        console.error(error);
        response.statusCode = 400;
        response.body = { message: "Algo ocurrió al guardar el post en la base de datos", error: error };
        return response.toObject();
  }
};
