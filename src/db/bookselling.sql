SET NAMES UTF8;

DROP SCHEMA IF EXISTS `db_bookselling` ;
CREATE SCHEMA IF NOT EXISTS `db_bookselling` DEFAULT CHARACTER SET UTF8 ;
USE `db_bookselling` ;

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
    `book_image`            BLOB            NULL DEFAULT NULL,
    `book_description`      TEXT            NULL DEFAULT NULL,
    `book_pages`            INT(3)          NULL DEFAULT NULL,
    `book_price`            INT(3)          NOT NULL,
    UNIQUE KEY (`book_isbn`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `db_bookselling`.`tb_mislibros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_bookselling`.`tb_users_books` ;

CREATE TABLE IF NOT EXISTS `db_bookselling`.`tb_users_books` (
  `user_id`                 INT(8) NOT NULL,
  `book_id`                 INT(8) NOT NULL,
  PRIMARY KEY (`user_id`, `book_id`),
  CONSTRAINT `fk__tb_users__user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_bookselling`.`tb_users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk__tb_books__book_id`
    FOREIGN KEY (`book_id`)
    REFERENCES `db_bookselling`.`tb_books` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO `db_bookselling`.`tb_books`
(
    `book_isbn`,
    `book_title`,
    `book_editorial`,
    `book_author`,
    `book_language`,
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
    "En el año 1933, Berlín es un foco de agitación política y social. Lady Maud, ahora la esposa de Walter von Ulrich y madre de dos hijos, publica artículos en una revista semanal que ridiculizan al partido nazi mientras su marido manifiesta su oposición en el gobierno. Sin embargo, parece que nada podrá frenar el poder ascendente del canciller Adolf Hitler. Cuando Maud recibe la visita de Ethel Williams y su hijo Lloyd, todos serán testigos de la tiranía y la represión de la nueva Alemania. El reino del Tercer Reich se extenderá hasta Francia y más allá de la frontera rusa. Mientras, en Inglaterra, Lloyd Williams, activista político como su madre, luchará en el ejército británico para intentar frenar dicho avance, antes de alistarse en las brigadas internacionales de la guerra civil española, donde participará en la ofensiva de Zaragoza y la batalla de Belchite. Ty Gwyn, la mansión familiar de los Fitzherbert en País de Gales, se convertirá en acantonamiento para oficiales, y durante su estancia, Lloyd se sentirá atraído por la mujer de Boy Fitzherbert, la rica heredera americana Daisy Peshkov. En esta magnífica novela épica, Ken Follett transportará al lector a través de una Europa en ruinas, quebrada de nuevo por las guerras y los conflictos ideológicos. Los hijos de las cinco familias, protagonistas de La caída de los gigantes, forjarán su destino en los años turbulentos de la Segunda Guerra Mundial, la guerra civil española, el bombardeo de Pearl Harbor y la era de las bombas atómicas americanas y soviéticas.",
    960,
    10.40
),
(
    "978-8490322222",
    "Dime quien soy",
    "PLAZA & JANES EDITORES",
    "Julia Navarro",
    "Español",
    "Una periodista recibe una propuesta para investigar la azarosa vida de su bisabuela, una mujer de la que sólo se sabe que huyó de España abandonando a su marido y a su hijo poco antes de que estallara la Guerra Civil. Para rescatarla del olvido deberá reconstruir su historia desde los cimientos, siguiendo los pasos de su bi ografía y encajando, una a una, todas las piezas del inmenso y extraordinario puzzle de su existencia. Marcada por los hombres que pasaron por su vida -el empresario Santiago Carranza, el revolucionario Pierre Comte, el periodista estadounidense Albert James y el médico militar vinculado al nazismo Max von Schumann-, la vida de Amelia Garayoa es la de una mujer que aprendió que en la vidsa no se puede volver sobre el pasado para deshacerlo. Desde la España republicana hasta la caída del Muro de Berlín, pasando por la Segunda Guerra mundial y los oscuros años de la Guerra fría, esta burguesa y revolucionaria, esposa y amante, espía y asesina, actuará siempre de acuerdo a sus principios, enfrentándose a todo y cometiendo errores que no terminará nunca de pagar. Memoria de un siglo convulso, caracterizado por la barbarie de los totalitarismos, esta obra es una vuelta de tuerca en la trayectoria de una de nuestras novelistas más internacionales. Dime quién soy sorprende por su dramatismo e instrospección, por su intriga y por sus emociones a flor de piel. Una aventura desgarradora y cautivadora que tiene unos personajes excepcionalmente perfilados y literariamente inolvidables. La esperada nueva novela de Julia Navarro es el magnífico retrato de quienes vivieron intensa y apasionadamente un siglo turbulento. Ideología y compromiso en estado puro, amores y desamores desgarrados, aventura e historia de un siglo hecho pedazos, esta novela no sólo hechizará a los lectores de Julia Navarro sino que fascinará a todos aquellos interesados en nuestra propia historia.",
    1104,
    9.46
),
(
    "978-8499897318",
    "Steve Jobs. La biografía",
    "Debolsillo",
    "Walter Isaacson",
    "Inglés",
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
    "Manual que profundiza a traves de numerosas imágenes 3D en el increible mundo de los organos de los seres humanos.",
    456,
    44.50
),
(
    "978-8466315470",
    "¿Cómo criar al perro perfecto?",
    "PUNTO DE LECTURA",
    "JIM & JO PELTIER, MELISSA MILIO",
    "Español",
    "¿Quieres traer un perrito a casa pero tienes miedo de que un animalito tan adorable pueda convertirse en tu peor pesadilla? ¿Tu cachorro no para de morder los muebles? ¿Es incapaz de caminar con correa? ¿No sabes qué hacer para enseñarlo a controlar los esfínteres? ¿No te hace caso cuando lo llamas? ¿Estás desesperado porque no sabes qué hacer para que deje de llorar o aullar? Los cachorros poseen en su ADN la capacidad de aprender reglas y límites de las sociedades en las que viven. Si sabes comunicar con claridad las normas de convivencia en casa desde el primer día, tu mejor amigo se convertirá en el perro de tus sueños",
    336,
    16.75
),
(
    "978-8416051403",
    "Naruto 67",
    "Planeta DeAgostini Cómics",
    " Masashi Kishimoto",
    "Español",
    "Obito se ha transformado por completo en el jinchûriki de Jûbi, la bestia de diez colas. ¡Al alojar al bijû en su seno demuestra un poder apabullante cuando echa abajo la barrera protectora! La situación es desfavorable, pero Naruto y Sasuke pugnan por encontrar un hueco por el que lanzar un contraataque, sirviéndose de los poderes de resurrección de ultratumba de los Hokage. ¿¡Qué ocurrirá!?",
    192,
    6.80
),
(
    "978-8490601334",
    "Intensidad MAX",
    "LA ESFERA DE LOS LIBROS, S.L.",
    "Elsa Pataki y Fernando Sartorius",
    "Español",
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
    "En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe... músico, mendigo, ladrón, estudiante, mago, héroe y asesino. Ahora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando.",
    880,
    12.45
),
(
    "978-8497775311",
    "El arte de la guerra",
    "EDICIONES OBELISCO S.L.",
    "Sun Tzu",
    "Español",
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
    "Todos tenemos un código de conducta. Algunos lo llaman moral, otros religión. Pero los Colegas que realmente saben llaman a este santo grial El Código de los Colegas. Durante años, la sabiduría pasó de generación en generación a través de la tradición oral. Aquí tenemos por primera vez en la Historia el código oficial de conducta para Colegas. Mediante este sagrado y legendario documento, cualquier tío puede llegar a ser un Colega de verdad.",
    208,
    8.60
),
(
    "978-8493769482",
    "Los viajes de Jupiter",
    "INTERFOLIO",
    "Ted Simon",
    "Español",
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
    "Pocas cosas tienen peor fama que los impuestos. Sin embargo, los impuestos son el precio de la civilización: en la jungla no existen, y cuando el fraude aumenta, la civilización retrocede. Por eso es tan grave que a la pregunta de si Hacienda somos todos la respuesta suela ser un \"no\" rotundo. Porque, además, todos pagamos impuestos de algún tipo, y nos beneficiamos del gasto público en alguna medida. Pero en los últimos años, ante una crisis fiscal sin precedentes, los ciudadanos están viendo impotentes cómo se suben los impuestos y se recortan las prestaciones sociales. Este libro intenta dar respuesta a muchas preguntas que surgen en esta crisis: ¿Ha habido austeridad o despilfarro en los últimos años? ¿Se ha derrumbado la recaudación sólo por el fraude? ¿Ha servido para algo la subida indiscriminada de impuestos de los últimos tiempos?¿El fraude es una cuestión de grandes empresas o se extiende también a las pequeñas? ¿Qué son los paraísos fiscales?¿Qué trato fiscal han tenido, por ejemplo, el mundo del fútbol o la Banca?¿Son las SICAV un instrumento fiscal privilegiado?¿La solución a estos problemas es una amnistía fiscal?... Esta obra no sólo explica estos temas con claridad sino que aporta cifras contrastadas y vías de solución ante una crisis global de la economía española en la que la fiscalidad está en permanente primer plano. Un libro imprescindible para conocer la realidad de los impuestos y el fraude en España",
    288,
    10.25
),
(
    "978-8498721515",
    "La sombra",
    "ZETA BOLSILLO",
    "John Katzenbach",
    "Español",
    "En el Berlín de 1943 pocos vieron su cara, y nadie supo su nombre. Entre susurros era conocido como \"Der Schattenmann\", La Sombra, un despiadado delator judío que colaboraba con la Gestapo. Miami, finales del siglo XX. La vida del detective retirado Simon Winter da un giro repentino cuando recibe la visita de una aterrorizada vecina, una anciana cree haber visto a un fantasma del pasado. Cuando a la mañana siguiente aparece estrangulada, Winter es el único que sospecha la terrible verdad: un escurridizo asesino está exterminando a los supervivientes del Holocausto que viven en Miami.",
    456,
    6.60
),
(
    "978-8494120510",
    "Las ranas tambien se enamorans",
    "EDICIONES VERSATIL, S.L.",
    "Megan Maxwell",
    "Español",
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
);


