# Express

* Microframework de Node.js.
* Basado en Middlewares
* Funciona como motor de render del lado del servidor
* Muy utilizado en el desarrollo de API REST Full


## Middleware

Es una función que recibe tres argumentos:
```js
funtion(req, res, next){
  ...
  next();
}
```
> **req** -> HTTP request
> **res** -> HTTP response
> **next** -> Callback argument. (Llama al siguiente middleware)

Es como una serie de capas en un request. Con el podemons hacer modificaciones al request y al response object.

#### Tipos:
  * 3rd Party
  * Router Level
  * Application level
  * Built-in
  * Error-handling
