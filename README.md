# Alert Microservice

## About

This project uses [Feathers](http://feathersjs.com). An open source web  framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    
    ```
    cd path/to/pingeon; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```

## Environment Variables

All urls should be with `http://`, `amqp://` or `mongodb://`.

```
PINGEON - notification microservice url.
AMQP_URL - RabbitMQ url.
DATABASE_URL - db connection url.
PORT - What port server is listening.
DEBUG - All in app logs goes to 'app*'.
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Alert data structure

Alert data that comes from RabbitMQ has following structure:

```
{
  "from",  // Who send data  
  "data",  // Document object from db
  "origin" // Original data before update
}
```

Example of document object:

```
{
  "id": "56e1f8d38fea3c9f048b4568",
  "state": "inProgress",
  "location": "56a8fa488fea3ce12a8b4567",
  "createdDate": "2016-03-10T22:44:35+00:00",
  "createdBy": "56a8fa4c8fea3ceb2a8b4567",
  "totalQuestions": 1,
  "questions": [
    "56e1f5b98fea3ca0048b4567"
  ]
}
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
