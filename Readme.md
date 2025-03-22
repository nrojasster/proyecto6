# Proyecto Node + MongoDB Atlas + Stripe
## DWFSc16 BootCampUDD BackEnd Proyecto Final

### Author: Natacha Rojas
### Fecha: marzo-2025

**Aplicación BackEnd con Autenticación utilizando NodeJs y MongoDB Atlas**, la cual admite los siguientes Endpoints:

**Product** (frutas y/o Verduras):

(GET) https://proyecto6-a7j5.onrender.com/api/product/readall ==> Permite ver todos los elementos de la colección Products, no es necesario el token de autenticación.

(POST) https://proyecto6-a7j5.onrender.com/api/product/create ==> Permite crear productos en la coleccion Products y en la pasarela de pagos Stripe, ya que los codigos de producto y precio se deben almacenar en la colección productos para poder realizar los pagos correctamente en Stripe.

nota: No describire los otros endpoints del controlador Products ya que no se utilizan en el frontEnd de proyecto 7

**EndPoints User**

(POST) https://proyecto6-a7j5.onrender.com/api/user/register ==> Permite Crear un nuevo usuario indicando username, email y contraseña y un carro vacío en la coleccion Carts, no requiere token de autenticación, usar el siguiente json:

    {    
    "username": "PPerez",

    "email": "rolguin@mail.com",

    "password": "qazwsxed4"
    }

(POST) https://proyecto6-a7j5.onrender.com/api/user/login ==> permite obtener token de autenticación proporcionando el usernmame y password previamente creadas

(GET) https://proyecto6-a7j5.onrender.com/api/user/verifytoken ==> indica el usuario asociado al token de autenticación si esta vigente, caso contrario entrega mensaje: "Acceso no autorizado"
**(el token tiene vigencia de 18 horas aprox.)**

(PUT) https://proyecto6-a7j5.onrender.com/api/user/update/679d1c270b43caffc3ce80bd ==> Permite actualizar información del usuario indicado en el ID, username, password y/o email, requiere token de autenticación, los campos username y email no pueden estar repetidos, asi que solo se puede modificar la contraseña

**EndPoinst Cart**

(GET) https://proyecto6-a7j5.onrender.com/api/cart/get-cart ==> devuelve el carro asociado al usuario autenticado por el token

(GET) https://proyecto6-a7j5.onrender.com/api/cart/cart/5854df5d5d5d5f5f ==> devuelve el carro indicado en los params, directamente sin indicar el usuario, pero debe igualmente estar autenticado

(PUT) https://proyecto6-a7j5.onrender.com/api/cart/edit-cart/5854df5d5d5d5f5f ==> requiere autenticacion, modifica el contenido del carro de compras del id de usuario indicado en los parametros según el producto indicado en el json del body, devuelve el carro actualizado. Este endpoint se usa desde el catalogo de productos por medio de los click del usuario

(PUT) https://proyecto6-a7j5.onrender.com/api/cart/edit-cart2/5854df5d5d5d5f5f ==> requiere autenticacion, modifica el contenido del carro de compras del id de usuario indicado en los parametros según el producto indicado en el json del body, devuelve el carro actualizado, este endPoint se diferencia del anterior en que el carro se modifica desde el /carrito y no desde el catalogo de productos (/). en este caso el producto existe solo se modifica la cantidad.

(DELETE) https://proyecto6-a7j5.onrender.com/api/cart/delete-cart/5854df5d5d5d5f5f ==> requiere autenticacion, elimina un producto del carro de compras del id de usuario indicado en los parametros según el producto indicado en el json del body, devuelve el carro actualizado.

(GET) https://proyecto6-a7j5.onrender.com/api/cart/create-checkout-session/hfdjdjs4djsdjdsksd343 ==> genera sesión en Stripe para realizar el pago de los productos almacenados en el carro del usuario indicado en params, el cual debe estar autenticado, y devuelve url de Stripe según si tuvo exito o no el pago, además deja el carro vacío.

**----------------------------------------------------------------------------------------**

Proyecto desplegado en Render y base de datos MongoDB Atlas:

https://proyecto6-a7j5.onrender.com/api/

Variables de entorno:

**MONGODB_URI**  (ruta de la BD en MongoDB Atlas)

**SECRET** (frase para encriptar)

**REACT_BASE_URL** (ruta pago stripe exitosa)

**REACT_BASE_URL_CANCEL** (ruta pago fallido en Stripe)

**STRIPE_KEY** (api Key proporcionada por Stripe ambiente pruebas)



