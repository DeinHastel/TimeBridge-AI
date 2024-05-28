-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-09-2023 a las 22:00:51
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_privilege_team`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `actualizar_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_usuario` (IN `id_usuario_u` INT, IN `nombre_u` VARCHAR(100), IN `apellido_u` VARCHAR(100), IN `fecha_nacimiento_u` DATE)   BEGIN
    UPDATE usuario
    SET nombre = nombre_u, apellido = apellido_u, fecha_nacimiento = fecha_nacimiento_u
    WHERE id_usuario = id_usuario_u;
END$$

DROP PROCEDURE IF EXISTS `asignar_categoria`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `asignar_categoria` (IN `id_contenido_u` INT, IN `id_categoria_u` INT)   BEGIN
    INSERT INTO content_category (id_contenido, id_categoria)
    VALUES (id_contenido_u, id_categoria_u);
END$$

DROP PROCEDURE IF EXISTS `crear_category`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_category` (IN `nombre_u` VARCHAR(60), IN `descripcion_u` TEXT, IN `id_categoria_principal_u` INT)   BEGIN
    INSERT INTO category (nombre, descripcion, id_categoria_principal)
    VALUES (nombre_u, descripcion_u, id_categoria_principal_u);
END$$

DROP PROCEDURE IF EXISTS `crear_content`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_content` (IN `titulo_u` VARCHAR(150), IN `descripcion_u` TEXT, IN `url_contenido_u` VARCHAR(250), IN `tipo_archivo_u` VARCHAR(50), IN `peso_archivo_u` BIGINT, IN `id_autor_u` INT, IN `url_miniatura_u` VARCHAR(250), IN `duracion_u` INT)   BEGIN
    INSERT INTO content (titulo, descripcion, url_contenido, tipo_archivo, peso_archivo, id_autor, url_miniatura, duracion)
    VALUES (titulo_u, descripcion_u, url_contenido_u, tipo_archivo_u, peso_archivo_u, id_autor_u, url_miniatura_u, duracion_u);
END$$

DROP PROCEDURE IF EXISTS `crear_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_usuario` (IN `nombre_usuario_u` VARCHAR(30), IN `hash_contraseña_u` VARCHAR(50), IN `correo_u` VARCHAR(100), IN `nombre_u` VARCHAR(100), IN `apellido_u` VARCHAR(100), IN `fecha_nacimiento_u` DATE, IN `foto_perfil_url_u` VARCHAR(250))   BEGIN
    INSERT INTO usuario (nombre_usuario , hash_contraseña, correo, nombre, apellido, fecha_nacimiento, foto_perfil_url)
    VALUES (nombre_usuario_u , hash_contraseña_u, correo_u, nombre_u, apellido_u, fecha_nacimiento_u, foto_perfil_url_u);
END$$

DROP PROCEDURE IF EXISTS `eliminar_content`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_content` (IN `id_contenido_u` INT)   BEGIN
    DELETE FROM content
    WHERE id_contenido = id_contenido_u;
END$$

DROP PROCEDURE IF EXISTS `obtener_content_de_category`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_content_de_category` (IN `id_categoria_u` INT)   BEGIN
    SELECT c.*
    FROM content c
    INNER JOIN content_category cc ON c.id_contenido = cc.id_contenido
    WHERE cc.id_categoria = id_categoria_u;
END$$

DROP PROCEDURE IF EXISTS `obtener_content_de_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_content_de_usuario` (IN `id_usuario_u` INT)   BEGIN
    SELECT c.*
    FROM content c
    WHERE c.id_autor = id_usuario_u;
END$$

DROP PROCEDURE IF EXISTS `usuarios_con_acceso_a_content`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarios_con_acceso_a_content` (IN `id_contenido_u` INT)   BEGIN
    SELECT u.*
    FROM usuario u
    INNER JOIN usuario_content uc ON u.id_usuario = uc.id_usuario 
    WHERE uc.id_contenido = id_contenido_u;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `descripcion` text,
  `id_categoria_principal` int DEFAULT NULL,
  PRIMARY KEY (`id_categoria`),
  KEY `id_categoria_principal` (`id_categoria_principal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `id_contenido` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text,
  `url_contenido` varchar(250) NOT NULL,
  `tipo_archivo` varchar(50) DEFAULT NULL,
  `peso_archivo` bigint DEFAULT NULL,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_autor` int DEFAULT NULL,
  `url_miniatura` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  PRIMARY KEY (`id_contenido`),
  KEY `id_autor` (`id_autor`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `content_category`
--

DROP TABLE IF EXISTS `content_category`;
CREATE TABLE IF NOT EXISTS `content_category` (
  `id_contenido` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_contenido`,`id_categoria`),
  KEY `id_category` (`id_categoria`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(30) NOT NULL,
  `hash_contraseña` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `foto_perfil_url` varchar(250) DEFAULT NULL,
  `superusuario` tinyint(1) DEFAULT '0',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_conexion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_content`
--

DROP TABLE IF EXISTS `usuario_content`;
CREATE TABLE IF NOT EXISTS `usuario_content` (
  `id_usuario` int NOT NULL,
  `id_contenido` int NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_contenido`),
  KEY `id_contenido` (`id_contenido`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
