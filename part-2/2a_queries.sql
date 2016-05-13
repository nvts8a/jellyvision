# Medical Plans for a Company
SELECT MedicalPlans.Name
FROM MedicalPlans
JOIN EmployeeGroups
  ON EmployeeGroups.Name = MedicalPlans.EmployeeGroupName
WHERE EmployeeGroups.CompanyName = "CompanyName";

# Employee Groups for a Company
SELECT Name
FROM EmployeeGroups
WHERE CompanyName = "CompanyName";

# Employee Groups who have access to a Medical Plan
SELECT EmployeeGroupName
FROM MedicalPlans
WHERE Name = "MedicalPlanName";

# Medical Plans for a Employee Group
SELECT Name
FROM MedicalPlans
WHERE EmployeeGroupName = "EmployeeGroupName";
