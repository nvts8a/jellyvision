CREATE DATABASE Jellyvision;
USE Jellyvision;

CREATE TABLE Companies (
  Name varchar(64) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE EmployeeGroups (
  Name varchar(64) NOT NULL,
  CompanyName varchar(64) NOT NULL,
  PRIMARY KEY (Name),
  FOREIGN KEY (CompanyName) REFERENCES Companies(Name)
);

CREATE TABLE MedicalPlans (
  Name varchar(64) NOT NULL,
  EmployeeGroupName varchar(64) NOT NULL,
  PRIMARY KEY (Name,EmployeeGroupName)
);

