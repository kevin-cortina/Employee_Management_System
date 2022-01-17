DROP DATABASE IF EXISTS employee_management_db;
CREATE DATABASE employee_management_db;

USE employee_management_db;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_name)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  job_title VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  salary INT(10) NOT NULL,
  PRIMARY KEY
  FOREIGN KEY(department_name)
    REFERENCES departments(department_name)
    ON DELETE SET NULL
  FOREIGN KEY(salary)
    REFERENCES employees(salary)
  FOREIGN KEY (job_title)
    REFERENCES employees(job_title)
  
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  salary INT(10) NOT NULL,
  PRIMARY KEY
  FOREIGN KEY 
    REFERENCES
);

