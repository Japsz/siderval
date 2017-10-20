-- MySQL Script generated by MySQL Workbench
-- 10/20/17 14:19:58
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema siderval
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema siderval
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `siderval` DEFAULT CHARACTER SET utf8 ;
USE `siderval` ;

-- -----------------------------------------------------
-- Table `siderval`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` INT NOT NULL DEFAULT 2,
  PRIMARY KEY (`iduser`));


-- -----------------------------------------------------
-- Table `siderval`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`material` (
  `idmaterial` INT NOT NULL AUTO_INCREMENT,
  `u_medida` VARCHAR(10) NULL,
  `f_aprov` VARCHAR(20) NULL,
  `leadtime` INT NULL,
  `precio` INT NULL,
  `abc` VARCHAR(1) NULL,
  `tipo` VARCHAR(5) NOT NULL,
  `especificacion` INT NULL,
  `caracteristica` INT NULL,
  `idproducto` INT NULL,
  `estado` VARCHAR(5) NULL,
  `detalle` VARCHAR(300) NULL,
  PRIMARY KEY (`idmaterial`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`Producto` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `idmaterial` INT NOT NULL,
  `aleacion` VARCHAR(45) NULL,
  `subaleacion` VARCHAR(45) NULL,
  `pdf` VARCHAR(200) NULL,
  INDEX `fk_Pterminado_material_idx` (`idmaterial` ASC),
  PRIMARY KEY (`idproducto`, `idmaterial`),
  CONSTRAINT `fk_Pterminado_material`
    FOREIGN KEY (`idmaterial`)
    REFERENCES `siderval`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`Recurso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`Recurso` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `idmaterial` INT NOT NULL,
  `u_pedido` VARCHAR(10) NULL,
  `cod_proveedor` VARCHAR(45) NULL,
  `punto_pedido` VARCHAR(50) NULL,
  PRIMARY KEY (`idproducto`, `idmaterial`),
  CONSTRAINT `fk_Recurso_material1`
    FOREIGN KEY (`idmaterial`)
    REFERENCES `siderval`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`Otro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`Otro` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `idmaterial` INT NOT NULL,
  `helper` VARCHAR(45) NULL,
  PRIMARY KEY (`idproducto`, `idmaterial`),
  CONSTRAINT `fk_Otro_material1`
    FOREIGN KEY (`idmaterial`)
    REFERENCES `siderval`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`bom` (
  `idproducto` INT NOT NULL,
  `idmaterial_master` INT NOT NULL,
  `idmaterial_slave` INT NOT NULL,
  `cantidad` INT NULL,
  `altura` INT NOT NULL DEFAULT 1,
  `hoja_padre` INT NULL,
  PRIMARY KEY (`idproducto`, `idmaterial_master`, `idmaterial_slave`),
  INDEX `fk_Producto_has_material_material1_idx` (`idmaterial_slave` ASC),
  INDEX `fk_Producto_has_material_Producto1_idx` (`idproducto` ASC, `idmaterial_master` ASC),
  CONSTRAINT `fk_Producto_has_material_Producto1`
    FOREIGN KEY (`idproducto` , `idmaterial_master`)
    REFERENCES `siderval`.`Producto` (`idproducto` , `idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_has_material_material1`
    FOREIGN KEY (`idmaterial_slave`)
    REFERENCES `siderval`.`material` (`idmaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`aleacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`aleacion` (
  `idaleacion` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  PRIMARY KEY (`idaleacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`subaleacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`subaleacion` (
  `idsubaleacion` INT NOT NULL AUTO_INCREMENT,
  `subnom` VARCHAR(45) NULL,
  `idaleacion` INT NOT NULL,
  PRIMARY KEY (`idsubaleacion`),
  INDEX `fk_subaleacion_aleacion1_idx` (`idaleacion` ASC),
  CONSTRAINT `fk_subaleacion_aleacion1`
    FOREIGN KEY (`idaleacion`)
    REFERENCES `siderval`.`aleacion` (`idaleacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `siderval`.`caracteristica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `siderval`.`caracteristica` (
  `idcaracteristica` INT NOT NULL AUTO_INCREMENT,
  `cnom` VARCHAR(45) NULL,
  PRIMARY KEY (`idcaracteristica`))
ENGINE = InnoDB;

CREATE USER 'user' IDENTIFIED BY '1234';

GRANT SELECT ON TABLE `siderval`.* TO 'user';
GRANT SELECT, INSERT, TRIGGER ON TABLE `siderval`.* TO 'user';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `siderval`.* TO 'user';
CREATE USER 'admin' IDENTIFIED BY '1234';

GRANT ALL ON `siderval`.* TO 'admin';
GRANT SELECT ON TABLE `siderval`.* TO 'admin';
GRANT SELECT, INSERT, TRIGGER ON TABLE `siderval`.* TO 'admin';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `siderval`.* TO 'admin';
GRANT EXECUTE ON ROUTINE `siderval`.* TO 'admin';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
USE `siderval`;

DELIMITER $$
USE `siderval`$$
CREATE DEFINER = CURRENT_USER TRIGGER `siderval`.`Producto_AFTER_INSERT` AFTER INSERT ON `Producto` FOR EACH ROW
BEGIN
 UPDATE material SET material.idproducto = NEW.idproducto WHERE material.idmaterial = NEW.idmaterial; 
END$$

USE `siderval`$$
CREATE DEFINER = CURRENT_USER TRIGGER `siderval`.`Recurso_AFTER_INSERT` AFTER INSERT ON `Recurso` FOR EACH ROW
BEGIN
	UPDATE material SET material.idproducto = NEW.idproducto WHERE material.idmaterial = NEW.idmaterial;
END$$

USE `siderval`$$
CREATE DEFINER = CURRENT_USER TRIGGER `siderval`.`Otro_AFTER_INSERT` AFTER INSERT ON `Otro` FOR EACH ROW
BEGIN
  UPDATE material SET material.idproducto = NEW.idproducto WHERE material.idmaterial = NEW.idmaterial;
END$$


DELIMITER ;
