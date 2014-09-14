SET NAMES UTF8;

DROP SCHEMA IF EXISTS `db_bookselling` ;
CREATE SCHEMA IF NOT EXISTS `db_bookselling` DEFAULT CHARACTER SET UTF8 ;
USE `db_bookselling` ;

DELIMITER $$ 

DROP FUNCTION IF EXISTS `db_bookselling`.`normalize_string`$$ 
CREATE FUNCTION `normalize_string`(x VARCHAR(255)) RETURNS varchar(255) CHARSET UTF8 
BEGIN 

DECLARE TextString VARCHAR(255) ; 
SET TextString = LOWER( x ) ; 

IF INSTR( x , ' ' ) 
THEN SET TextString = REPLACE(TextString, ' ','-') ; 
END IF ;

IF INSTR( x , 'á' ) 
THEN SET TextString = REPLACE(TextString, 'á','a') ; 
END IF ;

IF INSTR( x , 'é' ) 
THEN SET TextString = REPLACE(TextString, 'é','e') ; 
END IF ;

IF INSTR( x , 'í' ) 
THEN SET TextString = REPLACE(TextString, 'í','i') ; 
END IF ;

IF INSTR( x , 'ó' ) 
THEN SET TextString = REPLACE(TextString, 'ó','o') ; 
END IF ;

IF INSTR( x , 'ú' ) 
THEN SET TextString = REPLACE(TextString, 'ú','u') ; 
END IF ;

RETURN TextString ; 

END$$ 

DELIMITER ;

-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_users` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_users` (
    `user_id`               INT(8)          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_email`            VARCHAR(45)     NOT NULL,
    `user_password`         VARCHAR(32)     NOT NULL,
    `user_name`             VARCHAR(45)     NOT NULL,
    `user_surname`          VARCHAR(45)     NOT NULL,
    `user_birthdate`        VARCHAR(45)     NOT NULL,
    `user_sex`              VARCHAR(45)     NOT NULL,
    `user_phone`            VARCHAR(45)     NULL DEFAULT NULL,
    `user_address`          VARCHAR(100)    NULL DEFAULT NULL,
    `user_cp`               VARCHAR(8)      NOT NULL,
    `user_state`            VARCHAR(15)     NOT NULL,
    `user_country`          VARCHAR(45)     NOT NULL,
    UNIQUE KEY (`user_email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_libros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_books` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_books` (
    `book_id`               INT(8)          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `book_isbn`             VARCHAR(14)     NOT NULL,
    `book_title`            VARCHAR(45)     NOT NULL,
    `book_editorial`        VARCHAR(45)     NOT NULL,
    `book_author`           VARCHAR(45)     NOT NULL,
    `book_language`         VARCHAR(200)    NOT NULL,
    `book_image`            TEXT            NULL DEFAULT NULL,
    `book_category`         VARCHAR(45)     NOT NULL,
    `book_description`      TEXT            NULL DEFAULT NULL,
    `book_pages`            INT(3)          NULL DEFAULT NULL,
    `book_price`            DECIMAL(5,2) 	NOT NULL,
    UNIQUE KEY (`book_isbn`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_books_uploaded`--Libros subidos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_books_uploaded` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_books_uploaded` (
  `book_uploaded_id`        INT(8)          NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  `book_uploaded_date`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `book_uploaded_price`     DECIMAL(5,2) NOT NULL,
  `user_id`                 INT(8) NOT NULL,
  `book_id`                 INT(8) NOT NULL,
  


  UNIQUE KEY (`user_id`, `book_id`),
  CONSTRAINT `fk__tb_users__user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_bookselling`.`tb_users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk__tb_books__book_id`
    FOREIGN KEY (`book_id`)
    REFERENCES `db_bookselling`.`tb_books` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_purchases`--Compras
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_purchases` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_purchases` (
  `purchase_id`             INT(8)          NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  `purchase_date`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `purchase_status`         ENUM( "En proceso","Entregado","En envio", "Error" ),
  `user_id`                 INT(8) NOT NULL,

  CONSTRAINT `fk__tb_user__user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_bookselling`.`tb_users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_books_purchased`--Libros vendidos
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_books_purchased` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_books_purchased` (
  `purchase_id`             INT(8) NOT NULL,
  `book_uploaded_id`        INT(8) NOT NULL,

  PRIMARY KEY (`purchase_id`, `book_uploaded_id`),
  CONSTRAINT `fk__tb_books__book_uploaded_id`
    FOREIGN KEY (`book_uploaded_id`)
    REFERENCES `db_bookselling`.`tb_books_uploaded` (`book_uploaded_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_contact`--Formulario de contacto
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_contact` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_contact` (
  	`contact_id`        INT(8)          NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  	`contact_name`      VARCHAR(25) 	NOT NULL,
  	`contact_surname`   VARCHAR(25) 	NOT NULL,
  	`contact_email`  	VARCHAR(25) 	NOT NULL,
	`contact_message`   TEXT            NOT NULL)

ENGINE = InnoDB;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books` --Libros
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books` AS
SELECT 
    *, normalize_string( `book_category` ) AS `book_category_normalize`
FROM
    `db_bookselling`.`tb_books`;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_available` --Libros disponibles
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books_available` AS
SELECT
    `bu`.`book_uploaded_id`, 
    `b`.`book_id`,
    `b`.`book_isbn`,
    `b`.`book_title`,
    `b`.`book_editorial`,
    `b`.`book_author`,
   	`b`.`book_language`,
    `b`.`book_image`,
    `b`.`book_description`,
    `b`.`book_category`,
    `b`.`book_category_normalize`,
    `b`.`book_pages`,
    `b`.`book_price`
FROM
    `db_bookselling`.`tb_books_uploaded` as `bu`
        LEFT JOIN
    `db_bookselling`.`v_books` AS `b` USING (`book_id`)
        LEFT join
    `db_bookselling`.`tb_books_purchased` as `bp` ON `bu`.`book_uploaded_id` = `bp`.`book_uploaded_id`
WHERE
    `bp`.`book_uploaded_id` IS NULL;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_purchased` --Libros comprados
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books_purchased` AS
SELECT
    *
FROM
    `db_bookselling`.`tb_books_purchased`
        LEFT join
    `db_bookselling`.`tb_books_uploaded` USING (`book_uploaded_id`)
        LEFT JOIN
   `db_bookselling`.`v_books` USING (`book_id`);

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_uploaded` --Libros subidos
-- -----------------------------------------------------

CREATE OR REPLACE VIEW `db_bookselling`.`v_books_uploaded` AS
SELECT 
    *
FROM
    `db_bookselling`.`tb_books_uploaded`
        LEFT JOIN
    `db_bookselling`.`v_books` USING (`book_id`);

-- -----------------------------------------------------
-- View `db_bookselling`.`v_purchases` --Compras
-- -----------------------------------------------------

CREATE OR REPLACE VIEW `db_bookselling`.`v_purchases` AS
SELECT 
	p.*,
    SUM(book_uploaded_price) AS purchase_price_total
FROM
    db_bookselling.tb_purchases AS p
        LEFT JOIN
    v_books_purchased USING (purchase_id)
GROUP BY purchase_id;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_purchased_new` --Ultimos libros comprados
-- -----------------------------------------------------

CREATE OR REPLACE VIEW `db_bookselling`.`v_books_purchased_new` AS
SELECT 
    *
FROM
    v_books_purchased
ORDER BY purchase_id DESC
LIMIT 4;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_available_new` --Novedades
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books_available_new` AS
SELECT 
    *
FROM
    v_books_available
ORDER BY book_id DESC
LIMIT 12
;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_purchased_top` --Novedades
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books_purchased_top` AS
SELECT 
	b.*,
    COUNT(0) AS book_purchased_count
FROM
    db_bookselling.v_books_purchased AS bp
LEFT JOIN
	db_bookselling.v_books AS b USING(book_id)
GROUP BY book_id;

-- -----------------------------------------------------
-- View `db_bookselling`.`v_books_categories` --Categorias de libros
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `db_bookselling`.`v_books_categories` AS
SELECT distinct
    (`book_category`), `book_category_normalize`
FROM
    `db_bookselling`.`v_books_available`;


INSERT INTO `db_bookselling`.`tb_books`
(
    `book_isbn`,
    `book_title`,
    `book_editorial`,
    `book_author`,
    `book_language`,
    `book_category`,
    `book_image`,
    `book_description`,
    `book_pages`,
    `book_price`
)
 
                   
VALUES
(
    "978-8490328156",
    "El invierno del mundo",
    "Debolsillo",
    "Ken Follett",
    "Español",
    "Accion y Aventura",
    ( @image ),
    "El invierno del mundo es una novela histórica, que constituye el segundo libro de la Trilogía del Siglo The Century, de Ken Follett, que comenzó con La caída de los gigantes.",
    960,
    10.40
),
(
    "978-8490322222",
    "Dime quien soy",
    "Plaza & Janes Editores",
    "Julia Navarro",
    "Español",
    "Accion y Aventura",
    ( @image ),
    "Una periodista recibe una propuesta para investigar la azarosa vida de su bisabuela, una mujer de la que sólo se sabe que huyó de España abandonando a su marido y a su hijo poco antes de que estallara la Guerra Civil. Para rescatarla del olvido deberá reconstruir su historia desde los cimientos, siguiendo los pasos de su biografía y encajando, una a una, todas las piezas del inmenso y extraordinario puzzle de su existencia. Marcada por los hombres que pasaron por su vida -el empresario Santiago Carranza, el revolucionario Pierre Comte, el periodista estadounidense Albert James y el médico militar vinculado al nazismo Max von Schumann-, la vida de Amelia Garayoa es la de una mujer que aprendió que en la vida no se puede volver sobre el pasado para deshacerlo. Desde la España republicana hasta la caída del Muro de Berlín, pasando por la Segunda Guerra mundial y los oscuros años de la Guerra fría, esta burguesa y revolucionaria, esposa y amante, espía y asesina, actuará siempre de acuerdo a sus principios, enfrentándose a todo y cometiendo errores que no terminará nunca de pagar.",
    1104,
    9.46
),
(
    "978-8499897318",
    "Steve Jobs. La biografía",
    "Debolsillo",
    "Walter Isaacson",
    "Inglés",
    "Biografias",
    ( @image ),
    "La muerte de Steve Jobs conmocionó al mundo. Tras entrevistar a Jobs en más de cuarenta ocasiones en sus últimos años, además de a un centenar de personas de su entorno, familiares, amigos, adversarios y colegas, Walter Isaacson nos presenta la única biografía escrita con la colaboración de Jobs, el retrato definitivo de uno de los iconos indiscutibles de nuestro tiempo, la crónica de la agitada vida y de la abrasiva personalidad del genio cuya creatividad y energía revolucionaron seis industrias: la informática, el cine de animación, la música, la telefonía, las tabletas y la edición digital. Aquí, Jobs habla con una sinceridad a veces brutal sobre la gente con la que trabajó y contra la que compitió. De igual modo, sus amigos, rivales y colegas ofrecen una visión sin edulcorar de las pasiones, los demonios, el perfeccionismo, los deseos, el talento, los trucos y la obsesión por controlarlo todo que modelaron su visión empresarial y los innovadores productos que logró crear. Su historia, por tanto, está llena de enseñanzas sobre innovación, carácter, liderazgo y valores. La vida de un genio capaz de enfurecer y seducir a partes iguales",
    744,
    12.36
),
(
    "978-8499423548",
    "La vida oculta de Fidel Castro",
    "Ediciones Península",
    "Juan Reinaldo Sánchez",
    "Español",
    "Biografias",
    ( @image ),
    "Juan Reinaldo Sánchez estuvo 17 años, entre 1977 y 1994, vigilando cada paso de Fidel Castro, como miembro del equipo de seguridad del mandatario, que acabó dirigiendo. Durante todo ese tiempo, en el que fue un empleado abnegado y fiel, que idolatraba a su jefe, anotó en su libreta muchos de los detalles de la vida privada de Fidel.  A mediados de los noventa, y harto del clima enrarecido que empezaba a reinar entre los integrantes de la escolta de Fidel, Juan Reinaldo Sánchez decidió retirarse del servicio activo. Castro se mostró contrario a su decisión y a partir de aquel momento el antiguo guardaespaldas empezó a sufrir las consecuencias de haber tenido como jefe al dictador cubano. Le envió a la cárcel, de donde consiguió escapar y viajar a Estados Unidos en 2008. Desde Miami, y por primera vez, habla ahora de la vida secreta de quien desde los años sesenta dirige los destinos de todo el pueblo cubano.  ",
    300,
    19.78
),
(
    "978-8494072505",
    "Arduino",
    "RC Libros",
    "Oscar Torrente Artero",
    "Español",
    "Ciencias y tecnologia",
    ( @image ),
    "Cualquier técnico electrónico o aficionado a la electrónica necesita en alguna ocasión trabajar con microcontroladores. Esta tarea, durante años compleja, actualmente es mucho más simple gracias a Arduino. Arduino permite que cualquier persona (incluso profana en la electrónica y la programación) pueda realizar circuitos electrónicos que sean capaces de interaccionar con el mundo físico real. Gracias a su sencillez, campos como la robótica o la domótica (por nombrar solo dos) se han visto radicalmente impulsados con la llegada de Arduino, aunque es utilizado en muchos otros campos multidisciplinares, tales como el control y monitoraje de sensores, la activación remota de circuitos electromecánicos (vía Internet incluso), el montaje de instalaciones audiovisuales, etc. Arduino es tanto una placa de circuito impreso que incluye un microcontrolador, como un entorno de desarrollo diseñado para facilitar su programación mediante un lenguaje tremendamente intuitivo. Arduino es hardware y software libre; es decir, que puede descargarse gratuitamente de su web y utilizarse para el desarrollo de cualquier tipo de proyecto sin adquirir ninguna licencia porque su código fuente es público para todo el mundo. Esta obra incluye gran cantidad de ejemplos que facilitan al lector toda la información necesaria para realizar sus propios proyectos, sin requerir ninguna consulta externa. Solo con la ayuda de una placa Arduino UNO y un conjunto básico de componentes electrónicos (resistencias, condensadores, LEDs, etc.), ya podrá hacer realidad todos los circuitos descritos. El desarrollo del libro está pensado para servir de apoyo a la docencia, tanto de formación profesional como en los últimos cursos de la educación secundaria, para aficionados que deseen aprender de forma autodidacta, o como obra de consulta permanente para técnicos en electrónica.",
    588,
    21.60
),
(
    "978-8416004652",
    "Manual de Nefrologia",
    "Lippincott Raven",
    "Robert W. Schrier",
    "Inglés",
    "Ciencias y tecnologia",
    ( @image ),
    "Manual que profundiza a traves de numerosas imágenes 3D en el increible mundo de los organos de los seres humanos.",
    456,
    44.50
),
(
    "978-8466315470",
    "¿Cómo criar al perro perfecto?",
    "Punto de lectura",
    "Jim & Jo Peltier & Melissa Milio",
    "Español",
    "Comics",
    ( @image ),
    "¿Quieres traer un perrito a casa pero tienes miedo de que un animalito tan adorable pueda convertirse en tu peor pesadilla? ¿Tu cachorro no para de morder los muebles? ¿Es incapaz de caminar con correa? ¿No sabes qué hacer para enseñarlo a controlar los esfínteres? ¿No te hace caso cuando lo llamas? ¿Estás desesperado porque no sabes qué hacer para que deje de llorar o aullar? Los cachorros poseen en su ADN la capacidad de aprender reglas y límites de las sociedades en las que viven. Si sabes comunicar con claridad las normas de convivencia en casa desde el primer día, tu mejor amigo se convertirá en el perro de tus sueños",
    336,
    16.75
),
(
    "978-8416051403",
    "Naruto 67",
    "Planeta DeAgostini Cómics",
    "Masashi Kishimoto",
    "Español",
    "Comics",
    ( @image ),
    "Obito se ha transformado por completo en el jinchûriki de Jûbi, la bestia de diez colas. ¡Al alojar al bijû en su seno demuestra un poder apabullante cuando echa abajo la barrera protectora! La situación es desfavorable, pero Naruto y Sasuke pugnan por encontrar un hueco por el que lanzar un contraataque, sirviéndose de los poderes de resurrección de ultratumba de los Hokage. ¿¡Qué ocurrirá!?",
    192,
    6.80
),
(
    "978-8490601334",
    "Intensidad MAX",
    "La esfera de los libros S.L.",
    "Elsa Pataki y Fernando Sartorius",
    "Español",
    "Deportes",
    ( @image ),
    "Guia de entrenamiento personal",
    172,
    17.70
),
(
    "978-8490201992",
    "Código de leyes procesales",
    "La ley",
    "Vicente Gimeno Sendra",
    "Español",
    "Derecho",
    ( @image ),
    "Recopilatorio de las normas procesales más importantes del ordenamiento jurídico español. Incluye un completo índice de voces. Contenido del Código: - Constitución Española - Legislación orgánica (Ley Orgánica del Poder Judicial) - Ley Orgánica del Tribunal Constitucional - Legislación procesal civil (Ley de Enjuiciamiento Civil, condiciones generales de la contratación, propiedad horizontal, arrendamientos urbanos, patentes, marcas, competencia desleal, propiedad intelectual, venta a plazos y arbitraje) - Legislación procesal penal (Ley de Enjuiciamiento Criminal, jurado y menores) - Legislación procesal contencioso-administrativa (Ley de la Jurisdicción Contencioso-Administrativa) - Legislación procesal laboral Contenido en INTERNET: Además de las normas incorporadas al Código, en INTERNET se incluyen: - Legislación orgánica (Ley Orgánica del Poder Judicial, Ley de Conflictos Jurisdiccionales, Ley Orgánica del Tribunal Constitucional y demarcación y planta) - Legislación procesal civil (Ley de Enjuiciamiento Civil de 1881, Código Civil, Ley y Reglamento Hipotecario, embargo preventivo de buques, asistencia jurídica gratuita, protección al honor, derecho de rectificación, arrendamientos rústicos, sociedades anónimas y limitadas, cooperativas, hipoteca naval y mobiliaria y cambiaria y del cheque) - Legislación procesal penal (habeas corpus y extradición) - Legislación procesal contencioso-administrativa (Ley de Régimen Jurídico de las Administraciones Públicas y del Procedimiento Administrativo Común y asistencia jurídica al Estado) - Legislación procesal laboral (Ley de Procedimiento Laboral) - Formularios (Derecho Procesal Civil)",
    1632,
    24.50
),
(
    "978-8499082479",
    "El nombre del viento",
    "Debolsillo",
    "Patrick Rothfuss",
    "Español",
    "Fantasia",
    ( @image ),
    "En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe... músico, mendigo, ladrón, estudiante, mago, héroe y asesino. Ahora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando.",
    880,
    12.45
),
(
    "978-8497775311",
    "El arte de la guerra",
    "Ediciones obelisco S.L.",
    "Sun Tzu",
    "Español",
    "Historia",
    ( @image ),
    "Es el tratado sobre estrategia más famoso del mundo, que se ha convertido en un libro de culto en el ámbito de la empresa. Varias películas ambientadas en Wall Street han contribuido a popularizar este pequeño libro, que nos propone unos principios válidos tanto en el mundo de la estrategia militar como en el de los negocios o la política. A pesar de su antigüedad, se trata de un libro extremadamente moderno, que ayudará a reflexionar sobre cualquier tipo de problema y a plantear las estrategias necesarias para solucionarlo sin conflictos. LA EXCELENCIA SUPREMA CONSISTE EN QUEBRAR LA RESISTENCIA DEL ENEMIGO SIN LUCHAR (III-2) El arte de la guerra es el mejor libro de estrategia de todos los tiempos. Ideal para aplicar en todos los aspectos de la vida para conseguir la victoria sin entrar en conflicto.",
    112,
    19.90
),
(
    "978-8448008703",
    "El codigo de los colegas",
    "Timun Mas Narrativa",
    "Barney Stinson y Matt Kuhn",
    "Español",
    "Humor",
    ( @image ),
    "Todos tenemos un código de conducta. Algunos lo llaman moral, otros religión. Pero los Colegas que realmente saben llaman a este santo grial El Código de los Colegas. Durante años, la sabiduría pasó de generación en generación a través de la tradición oral. Aquí tenemos por primera vez en la Historia el código oficial de conducta para Colegas. Mediante este sagrado y legendario documento, cualquier tío puede llegar a ser un Colega de verdad.",
    208,
    8.60
),
(
    "978-8493769482",
    "Los viajes de Jupiter",
    "Interfolio",
    "Ted Simon",
    "Español",
    "Guias",
    ( @image ),
    "LOS VIAJES DE JÚPITER es considerado, con toda justicia, un libro de culto para todos los públicos en literatura de viajes.",
    800,
    22.15
),
(
    "978-8423348299",
    "Los cuerpos extraños",
    "Ediciones Destino",
    "Lorenzo Silva",
    "Español",
    "Policiaca",
    ( @image ),
    "Mientras pasa el fin de semana en familia, el brigada Bevilacqua recibe el aviso de que el cadáver de la alcaldesa de una localidad levantina, cuya desaparición había sido previamente denunciada por el marido, ha sido hallado por unos turistas en la playa. Para cuando Bevilacqua y su equipo llegan y se hacen cargo de la investigación, el juez ya ha levantado el cadáver, las primeras disposiciones están tomadas y se está preparando el funeral. El lugar es un avispero en el que se desatan todo tipo de rumores sobre la víctima, una joven promesa que venía a romper con los modos y corruptelas de los viejos mandarines del partido y que apostaba por renovar el modo de hacer política. Además, el descubrimiento de su agitada vida sexual, que puede calificarse de todo menos insípida, arroja sobre el caso una luz perturbadora. Pero no hay mucho tiempo para indagar y en esta ocasión Bevilacqua y Chamorro deben apresurar una hipótesis en un fuego de intereses cruzados, en el que la causa de la joven política es también la causa de la integridad personal, de la que el país entero parece haberse apeado.",
    352,
    11.70
),
(
    "978-8499923710",
    "¿Hacienda somos todos?",
    "Debate",
    "Francisco de la Torre",
    "Español",
    "Politica",
    ( @image ),
    "Pocas cosas tienen peor fama que los impuestos. Sin embargo, los impuestos son el precio de la civilización: en la jungla no existen, y cuando el fraude aumenta, la civilización retrocede. Por eso es tan grave que a la pregunta de si Hacienda somos todos la respuesta suela ser un \"no\" rotundo. Porque, además, todos pagamos impuestos de algún tipo, y nos beneficiamos del gasto público en alguna medida. Pero en los últimos años, ante una crisis fiscal sin precedentes, los ciudadanos están viendo impotentes cómo se suben los impuestos y se recortan las prestaciones sociales. Este libro intenta dar respuesta a muchas preguntas que surgen en esta crisis: ¿Ha habido austeridad o despilfarro en los últimos años? ¿Se ha derrumbado la recaudación sólo por el fraude? ¿Ha servido para algo la subida indiscriminada de impuestos de los últimos tiempos?¿El fraude es una cuestión de grandes empresas o se extiende también a las pequeñas? ¿Qué son los paraísos fiscales?¿Qué trato fiscal han tenido, por ejemplo, el mundo del fútbol o la Banca?¿Son las SICAV un instrumento fiscal privilegiado?¿La solución a estos problemas es una amnistía fiscal?... Esta obra no sólo explica estos temas con claridad sino que aporta cifras contrastadas y vías de solución ante una crisis global de la economía española en la que la fiscalidad está en permanente primer plano. Un libro imprescindible para conocer la realidad de los impuestos y el fraude en España",
    288,
    10.25
),
(
    "978-8498721515",
    "La sombra",
    "Zeta bolsillo",
    "John Katzenbach",
    "Español",
    "Terror",
    ( @image ),
    "En el Berlín de 1943 pocos vieron su cara, y nadie supo su nombre. Entre susurros era conocido como \"Der Schattenmann\", La Sombra, un despiadado delator judío que colaboraba con la Gestapo. Miami, finales del siglo XX. La vida del detective retirado Simon Winter da un giro repentino cuando recibe la visita de una aterrorizada vecina, una anciana cree haber visto a un fantasma del pasado. Cuando a la mañana siguiente aparece estrangulada, Winter es el único que sospecha la terrible verdad: un escurridizo asesino está exterminando a los supervivientes del Holocausto que viven en Miami.",
    456,
    6.60
),
(
    "978-8494120510",
    "Las ranas tambien se enamorans",
    "Ediciones versátil S.L.",
    "Megan Maxwell",
    "Español",
    "Romantica",
    ( @image ),
    "Relatos romanticos de parejas de hoy en dia.",
    384,
    13.80
);

INSERT INTO `db_bookselling`.`tb_users`
(
    `user_email`,
    `user_password`,
    `user_name`,
    `user_surname`,
    `user_birthdate`,
    `user_sex`,
    `user_phone`,
    `user_address`,
    `user_cp`,
    `user_state`,
    `user_country`
)
VALUES
(
    "jal198j@gmail.com",
    MD5("1234"),
    "Jorge",
    "Alonso López",
    "1988-07-24",
    "Hombre",
    "609896789",
    "Calle/Andevalo 7",
    "28053",
    "Madrid",
    "España"
),
(
    "rubencito@gmail.com",
    MD5("5678"),
    "Ruben",
    "Lopez",
    "1986-12-08",
    "Hombre",
    "605676787",
    "Calle/La noria 7",
    "28053",
    "Madrid",
    "España"
),
(
    "100066943@gmail.com",
    MD5("5678"),
    "Pepe",
    "Lopez",
    "1982-08-08",
    "Hombre",
    "605676787",
    "Calle/Brujula 7",
    "28053",
    "Barcelona",
    "España"
),
(
    "maria@gmail.com",
    MD5("casita"),
    "Maria",
    "Martin",
    "1980-12-08",
    "Mujer",
    "609787844",
    "Calle/Huesa 7",
    "28018",
    "Madrid",
    "España"
);


-- Subida de libros

INSERT INTO `db_bookselling`.`tb_books_uploaded`
(
    `book_uploaded_price`,
    `user_id`,
    `book_id`
)
VALUES
(
    10.40,
    1,
    1
),
(
    9.46,
    1,
    2
),
(
    12.36,
    1,
    3
),
(
    19.78,
    1,
    4
),
(
    21.60,
    2,
    5
),
(
    44.50,
    2,
    6
),
(
    16.75,
    2,
    7
),

(
    6.80,
    2,
    8
),

(
    17.70,
    2,
    9
),

(
    24.50,
    2,
    10
),

(
    12.45,
    3,
    11
),

(
    19.90,
    3,
    12
),

(
    6.60,
    3,
    17
),

(
    13.80,
    3,
    18
),

(
    8.60,
    4,
    13
),

(
    22.15,
    4,
    14
),

(
    11.70,
    4,
    15
),
(
    10.25,
    4,
    16
),
(
    10.25,
    3,
    1
);


INSERT INTO `db_bookselling`.`tb_purchases`
(
    `user_id`,
    `purchase_status`   
   
)
VALUES
(
    1,
    "En proceso"
),
(
    1,
    "Entregado"
),
(
    2,
    "Entregado"
),
(
    3,
    "Entregado"
);

INSERT INTO `db_bookselling`.`tb_books_purchased`
(
    `purchase_id`,
    `book_uploaded_id`
)
VALUES
(
    1,
    5
),

(
    1,
    11
),

(
    1,
    14
),
(
    2,
    2
),
(
    2,
    12
),
(
    2,
    15
),
(
    3,
    16
),
(
    4,
    19
),
(
    2,
    1
);

