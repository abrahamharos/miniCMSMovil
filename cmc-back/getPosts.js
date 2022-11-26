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

exports.handler = async (event) => {
    let response = new Response();

    try {
        let params = { TableName: `Posts` };
        let scanResults = [];
        let items;

        do {
            items = await ddb.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");
    
        response.statusCode = 200;
        response.body = scanResults;
        return response.toObject();
    } catch (error) {
        console.error(error);
        response.statusCode = 400;
        response.body = { message: "Algo ocurrió al obtener los posts en la base de datos", error: error };
        return response.toObject();
    }
};
