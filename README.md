# Share Debt Server

## About

This project uses [Feathers](http://feathersjs.com). An open source web  framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    
    ```
    cd path/to/share-debt; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```

## Environment Variables

All urls should be with `http://`, `amqp://` or `mongodb://`.

```
DATABASE_URL - db connection url.
```

## API

https://share-debt.tk

POST /debts - add debt
```
{ amount: 200,
  name: 'beer',
  to: '575ab12b2b222ca7084c347a',
  from: 
   [ '575ab12c2b222ca7084c347b',
     '575ab12c2b222ca7084c347c',
     '575ab12c2b222ca7084c347d' ] }
```

POST /debts/pay
```
{ from: '575ab19fcd9ae03d09b349a7',
  to: '575ab19fcd9ae03d09b349a6',
  amount: 10 }
```

GET /totals/to - have debts to me
GET /totals/from - my debts
```
[ { from: '575ab1d08e60dc9609272a68',
    to: '575ab1cf8e60dc9609272a67',
    amount: 66.66666666666667,
    id: '575ab1d08e60dc9609272a6c',
    fromName: 'Vasya',
    toName: 'Petya' }
]
```

POST /users - sign up
```
{
  email: String,
  password: String,
  number: String,
  name: String
}
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
