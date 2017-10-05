-- MySQL Script generated by MySQL Workbench
-- 10/05/17 04:09:05
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
  PRIMARY KEY (`iduser`));

CREATE USER 'user' IDENTIFIED BY '1234';

GRANT SELECT ON TABLE `siderval`.* TO 'user';
CREATE USER 'admin' IDENTIFIED BY '1234';

GRANT ALL ON `siderval`.* TO 'admin';
GRANT SELECT ON TABLE `siderval`.* TO 'admin';
GRANT SELECT, INSERT, TRIGGER ON TABLE `siderval`.* TO 'admin';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `siderval`.* TO 'admin';
GRANT EXECUTE ON ROUTINE `siderval`.* TO 'admin';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
