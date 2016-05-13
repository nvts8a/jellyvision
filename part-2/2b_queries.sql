SELECT *
FROM department
LEFT JOIN employee
  ON employee.department_id = department.department_id
