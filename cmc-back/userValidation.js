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
    const userParams = {
        TableName: `Users`,
        Key: {
          '_id': data.user,
        },
    };
    try {
        let client = await ddb.get(userParams).promise();
        if(!isEmptyObject(client) && client.Item.password == data.password) {
            response.statusCode = 200;
            response.body = { message: "Usuario y contraseña válidos" };
        } else if(!isEmptyObject(client)) {
            response.statusCode = 400;
            response.body = { message: "Contraseña incorrecta" };
        } else {
            response.statusCode = 400;
            response.body = { message: "Usuario no existe" };
        }
        return response.toObject();
  } catch (error) {
        console.error(error);
        response.statusCode = 400;
        response.body = { message: "Algo ocurrió", error: error };
        return response.toObject();
  }
};
