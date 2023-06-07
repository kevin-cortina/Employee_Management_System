DROP DATABASE IF EXISTS employee_management_db;
CREATE DATABASE employee_management_db;

USE employee_management_db;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  departmentsId INT AUTO_INCREMENT,
  departmentsName VARCHAR(30),
  PRIMARY KEY (departmentsId)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  rolesId INT AUTO_INCREMENT,
  job_title VARCHAR(30) NOT NULL,
  departmentsId INT,
  salary DECIMAL,
  PRIMARY KEY (rolesId),
  FOREIGN KEY (departmentsId) REFERENCES departments(departmentsId)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  salary DECIMAL,
  manager_id INT DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roles_id) REFERENCES roles(rolesId),
  FOREIGN KEY (manager_id) REFERENCES roles(rolesId)
);

