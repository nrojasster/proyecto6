# Proyecto Node + MongoDB Atlas
## DWFSc16 BootCampUDD

### Author: Natacha Rojas
### Fecha: 02-02-2025

**Aplicación BackEnd con Autenticación utilizando NodeJs y MongoDB Atlas**, la cual admite los siguientes Endpoints:

**Producto Cars** (automoviles):

(GET) https://proyecto6-a7j5.onrender.com/api/car/readall ==> Permite ver todos los elementos de la colección Cars, no es necesario el token de autenticación

(GET) https://proyecto6-a7j5.onrender.com/api/car/readone/id  ==> Muestra la información de elemento de la colección Cars segun el Id, requiere token de auntenticación

(POST) https://proyecto6-a7j5.onrender.com/api/car/create ==> Permite añadir un nuevo elemento a la coleccion Cars, requiere token de autenticación, Json de Datos, ejemplo:
    {
    "name": "Subaru",
    "year": 2024,
    "model": "Impreza"
    }

(PUT) https://proyecto6-a7j5.onrender.com/api/car/update/679edf71d1181e4abd47d33f ==> Permite actualizar elemento de la colección Cars según el ID, requiere token de autenticación.

(DELETE) https://proyecto6-a7j5.onrender.com/api/car/delete/679d1b940b43caffc3ce80b9 ==> Permite eliminar elemento de la colección Cars según el ID, requiere token de autenticación.


**EndPoints User**

(POST) https://proyecto6-a7j5.onrender.com/api/user/register ==> Permite Crear un nuevo usuario indicando username, email y contraseña, no requiere token de autenticación, usar el siguiente json:
    {
    "username": "PPerez",
    "email": "pperez@mail.com",
    "password": "pperez123"
    }

(POST) https://proyecto6-a7j5.onrender.com/api/user/login ==> permite obtener token de autenticación proporcionando el usernmame y password previamente creadas

(GET) https://proyecto6-a7j5.onrender.com/api/user/verifytoken ==> indica el usuario asociado al token de autenticación si esta vigente, caso contrario entrega mensaje: "Acceso no autorizado"
**(el token tiene vigencia de 18 horas aprox.)**

(PUT) https://proyecto6-a7j5.onrender.com/api/user/update/679d1c270b43caffc3ce80bd ==> Permite actualizar información del usuario indicado en el ID, username, password y/o email, requiere token de autenticación.

Proyecto desplegado en Render y base de datos MongoDB Atlas:

https://proyecto6-a7j5.onrender.com/api/

Variables de entorno:

**MONGODB_URI**  (ruta de la BD en MongoDB Atlas)

**SECRET** (frase para encriptar)



