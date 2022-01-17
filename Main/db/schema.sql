DROP DATABASE IF EXISTS employee_management_db;
CREATE DATABASE employee_management_db;

USE employee_management_db;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  job_title VARCHAR(30) NOT NULL,
  role_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  FOREIGN KEY(department_name)
    REFERENCES departments(department_name)
    ON DELETE SET NULL
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  salary INT(10) NOT NULL,
  manager_id INT(10),
  FOREIGN KEY (department_name)
    REFERENCES roles(department_name)
  FOREIGN KEY (department_name)
    REFERENCES roles(department_name)
);

