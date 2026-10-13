# SUPABASE

La base de datos de Supabase consiste en:

\_ Una tabla llamada "productos", que tiene, entre lo mas importante, el id de cada producto, el user_id, que es el id del usuario que subió el producto, y un local_id que se relaciona con el id de la tabla "locales", (relación de muchos a 1, un local tiene muchos productos, pero un producto tiene un solo local)

\_ Una tabla "locales", que tiene el id de cada local, el slug, que sería la url del local (kalmaind), y el user_id, que se relaciona con el id de la tabla "Authentication"

\_ La tabla "Authentication" que es donde guardo los inicios de sesión de los clientes de los locales

\_ En el storage, tengo un bucket llamado "productos-imagenes", y en React, cuando un local sube una imagen, se crea una carpeta dentro de éste bucket, con el UID del usuario, para tener una organzación de que imagen le pertenece a cada usuario

La lógica de back-end es que muchos locales se loguen con su cuenta en Authentication, una vez tienen su usuario, éstos pueden subir, a través de React, productos a la tabla "productos", y asi con todos los locales

En la tabla "locales" esta el id del local con su slug (kalmaind), éste le permite que en la tabla "productos" este el campo local_id, que se conecta con el id de "locales", permitiendo en el Front filtrar los productos por el slug de "locales"

# REACT

---------------------- Traer los productos
\_ Apenas se ingresa a la página, en App.jsx, trae todos los productos de la tabla "productos", cuyo slug actual sea igual al slug de locales, ésto es para filtrar los productos del local actual, sacando los productos de los otros locales. Los productos se pasa por parámetros a varias páginas, que se encargan de mostrar los productos en el front

----------------------- Enviar los productos
\_ En Admin.jsx se maneja la subida de productos de los locales a supabase, a través de un panel de control. Este proceso consiste en dos principales funciones:

obtenerProductos:
1* Obtiene el usuario que tiene la sesión activa actualmente
2* Va a la tabla "locales", para obtener el local cuyo user-id coincida con el id del usuario que se obtuvo en el paso anterior
3* Va a la tabla "productos" y obtiene todos los productos tales que coincidan el local*id, con el id del local obtenido en el paso anterior
4\_ Y esos son los productos que se muestran al cliente en el panel, para decir "estos son tus productos"

manejarSubmit:
1* Obtiene el usuario que tiene la sesión activa actualmente
2* Va a la tabla "locales", para obtener el local cuyo user*id coincida con el id del usuario que se obtuvo en el paso anterior
3* Crea el objeto a enviar, y le manda como campo el id del local obtenido en el paso anterior
