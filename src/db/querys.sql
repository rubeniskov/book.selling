-- Mostrar Libros Subidos
SELECT * FROM db_bookselling.tb_books_uploaded;
-- Mostrar Libros Vendidos
SELECT * FROM db_bookselling.tb_books_purchased;
-- Mostrar Libros Disponibles
SELECT * FROM db_bookselling.v_books_available;

--BOTON ORDENAR Afabetico A-Z--
SELECT * FROM db_bookselling.tb_books ORDER BY book_title;

--BOTON ORDENAR Afabetico Z-A--
SELECT * FROM db_bookselling.tb_books ORDER BY book_title DESC;

--BOTON ORDENAR Precio A-Z--
SELECT * FROM db_bookselling.tb_books ORDER BY book_price;
--BOTON ORDENAR Precio A-Z--
SELECT * FROM db_bookselling.tb_books ORDER BY book_price DESC;