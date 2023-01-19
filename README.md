# Adidas2023
Proyecto final para clase de coderhouse

La rama **Main** es especificamente para levantar Railway, ya que esta apunta todo a las direcciones relativas de railway la rama **proyectofinal** esta hecha para que se pueda levantar el proyecto en local

el proyecto consta de dos partes, el cliente y el servidor, el cliente es solo para poder obserbar las cosas hechas en el servidor, en railway como uso una arquitectura de capas simple el websocket no funciona (ya que apunta a otro puerto, para poder hacerlo en railway tendria q separar el proyecto en una capa adicional y exponer el puerto 4001)
usando la rama **proyectofinal** anda el sistema de comentarios, y el sistema de chat (que no esta implementado la parte de acceder a los chat ya que seria como otro proyeycto, pero basicamente seria un front con todos los rooms disponibles y entrar uno por uno)
# client
Se levanta con vite, un simple **npm run dev** lo puede levantar sin problemas.
# server

Como se puede ver estan todos los endpoint necesarios que se pidieron en el proyecto final.  los que tienen post, put, delete tienen el middelware de auth.

## Productos:
#### "/api/productos" => Get. Da la lista de todos los productos 
#### "/api/productos/:parametro" => Get. Este revisa por expresion regular si es un **id** o un **tipo** y te devuelve en relacion a eso 
#### "/api/productos/" => post. crea un producto 
#### "/api/productos/:id" => put. edita un producto 
#### "/api/productos/:id" => delete. borra un producto 

## Carro: 
#### '/api/carro/:id' => Get. Da la lista del carro segun el id
#### '/api/carro/:id/'=> post agrega elemento al carro de un usuario
#### '/api/carro/:id' => put. Edita un carro
#### '/api/carro/:id' => delete. elemina un producto de un carro

## Ordenes: 
#### "/api/ordenes/:id" => Get. recibe las ordenes de un usuario esepcifico // POR ALGUNA RAZON NO FUNCIONA EN RAILWAY PERO SI EN LOCAL
#### "/api/ordenes" => post. crea una nueva orden

## Users
#### '/api/logout' => Get.  Deloguea el usuario
#### '/api/signup' => Post. Da de alta un usuario
#### '/api/login' => Post. logea al usuario
#### '/api/user' => Get. Detalle de la coockie de sesion
## Email
#### '/api/email' => Get. testeo de el mail
