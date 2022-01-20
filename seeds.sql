INSERT INTO departments (departmentsName)
VALUES ("Administration"),
       ("Math"),
       ("Science"),
       ("English");

INSERT INTO roles (job_title, salary, departmentsId)
VALUES ("Principal", 120000, 1),
       ("Assistant Principal", 90000, 1),
       ("Teacher 1", 40000, 2),
       ("Teacher 1", 40000, 4),
       ("Teacher 2", 50000, 3),
       ("Teacher 2", 40000, 2),
       ("Teacher 3", 60000, 4),
       ("Head of Department", 70000, 1),
       ("Secretary", 45000, 1),
       ("Administrative Assistant", 32000, 1);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Arthur", "Ryan", 1, null),
       ("Thomas", "Jack", 2, 1),
       ("Ellen", "Skywalker", 3, 8),
       ("Elvis", "Presley", 4, 8),
       ("Yessler", "Jin", 5,  8),
       ("Obi", "Kenobi", 6, 8),
       ("Boba", "Fett", 7, 1),
       ("Tony", "Stark", 8 , 1);