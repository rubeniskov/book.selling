book.selling
============

## Commando para lanzar servidor

#### Site:

node index.js --port=8080 --service=site

#### Admin:

node index.js --port=8888 --service=admin

## Cosas pendientes

* [ V ] Cambiar todos los enlaces /book por /book/{{book.book_isbn}}
* [ V ] Arreglar session mongodb
* [ V ] Añadir funcionalidad de carrito
* [ V ] Añadir funcionalidad de subir libro
* Quitar exclamaciones del final del eslogan del Logotipo y ponerlo bien
* [ V ] Incluir en admin.less css de admin
* [ V ] la vista /book/{{book.book_isbn}} está mal conceptuada, no se puede añadr al carrito un libro de tb_books, habrá que hacer un listado de libros diponibles en ese módulo, que hayan subidos los usuarios.
* [ V ] Añadir al contacto un campo mensaje para que se inserte en una tabla tb_contact que se mostrará en el administrador
	* [ V ] Crear campo mensaje
	* [ V ] Crear tabla en base de datos
	* crear vista en administrador para mostrar los ensajes de contacto
* Grop by por book_id evitando repeticion de libros con precios diferentes--->book-list
* 
