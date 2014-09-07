book.selling
============

# Cosas pendientes

* Cambiar todos los enlaces a /book por /book/{{book.book_isbn}}
* Arreglar session mongodb
* Añadir funcionalidad de carrito
* Añadir funcionalidad de subir libro
* Incluir en admin.less css de admin
* la vista /book/{{book.book_isbn}} está mal conceptuada, no se puede añadr al carrito un libro de tb_books, habrá que hacer un listado de libros diponibles que hayan subidos los usuarios y que no se hayan comprado para añadir al carro 
* Añadir al contacto un campo mensaje para que se inserte en una tabla tb_contact que se mostrará en el administrador
** Crear campo mensaje
** Crear tabla en base de datos
** crear vista en administrador para mostrar los ensajes de contacto