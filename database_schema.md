# Database Schema

View schema at [dbdiagram.io](https://dbdiagram.io/d/64be211502bd1c4a5e9223c1)

```
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Project HRXcelerate {
  database_type: "PostgreSQL"
}

Table Users {
  id int [pk]
  email email [unique]
  password password
  first_name varchar
  last_name varchar
}

Table Companies {
  id int [pk]
  name varchar
  motto varchar
  description varchar
  website url
  // logo image
  address varchar
}

Table Employees {
  id int [ref: - Users.id, pk]
  company_id int [ref: > Companies.id]
  manager_id int [ref: > Employees.id, null]
  is_owner bool
  is_admin bool
  is_active bool
  gender enum
  date_of_birth date
  // avatar image
}

Table Departments {
  id int [pk]
  company_id int [ref: > Companies.id]
  name varchar
  description varchar
}

Table JobRoles {
  id int [pk]
  name varchar
  department_id int [ref: > Departments.id]
  description varchar
  rank int
}

Table Employment {
  id int [pk]
  employee_id int [ref: > Employees.id]
  job_role_id int [ref: > JobRoles.id]
  is_active bool
  start_date date
  end_date date
  employment_type enum
  is_remote bool
  // salary_currency enum
  // salary_frequency enum
  // salary_amount float
  note varchar
}

Table JobPostings {
  id int [pk]
  job_id int [ref: > JobRoles.id]
  tags varchar
  description varchar
  is_active bool
}

Table JobPostingsSalaries {
  id int [pk]
  job_posting_id int [ref: - JobPostings.id]
  // salary_currency enum
  // salary_frequency enum
  // min_salary_amount float
  // max_salary_amount float
}

Table Interviewers {
  id int [pk]
  job_posting_id int [ref: > JobPostings.id]
  employee_id int [ref: > Employees.id]
}

Table Applicants {
  id int [pk]
  job_posting_id int [ref: > JobPostings.id]
  first_name varchar
  last_name varchar
  email email
  // resume file
  status enum
}

Table InterviewResults {
  id int [pk]
  applicant_id int [ref: > Applicants.id]
  interviewer_id int [ref: > Interviewers.id]
  score float
  note varchar
}

Table Payslips {
  id int [pk]
  employee_id int [ref: > Employees.id]
  from_date date
  to_date date
  amount float
}

Table Trackings {
  id int [pk]
  employee_id int [ref: > Employees.id]
  start_time datetime
  end_time datetime
  note varchar
}

Table TimeOffs {
  id int [pk]
  employee_id int [ref: > Employees.id]
  start_time datetime
  end_time datetime
  status enum
}

Table Notifications {
  id int [pk]
  employee_id int [ref: > Employees.id]
  time datetime
  msg varchar
}
```
