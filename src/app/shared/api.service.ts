import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:4200/api';

  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  // get all employees
  getEmployees() {
    this.http
      .get<{ status: string; data: Employee[] }>(
        `${this.baseUrl}/api/v1/employees`
      )
      .subscribe((response) => {
        this.employees = response.data;
        this.employeeUpdated.next([...this.employees]);
      });
  }

  // create observable from subject
  getUpdatedEmployee() {
    return this.employeeUpdated.asObservable();
  }

  // get employee by id
  getEmployee(id: string) {
    return this.http.get<{ status: string; data: Employee }>(
      `${this.baseUrl}/api/v1/employee/${id}`
    );
  }

  // add new emloyee
  addEmployee(name: string, salary: string, age: string) {
    const employee: Employee = {
      employee_name: name,
      employee_salary: salary,
      employee_age: age,
    };
    this.http
      .post<{ status: string; data: {} }>(
        `${this.baseUrl}/api/v1/create`,
        employee
      )
      .subscribe((response) => {
        console.log(response.status);
        this.employees.push(employee);
        this.employeeUpdated.next([...this.employees]);
      });
  }

  // update employee by id
  updateEmployee(emplId: string, name: string, salary: string, age: string) {
    const employee: Employee = {
      id: emplId,
      employee_name: name,
      employee_salary: salary,
      employee_age: age,
    };
    this.http
      .put<{ status: string; message: string }>(
        `${this.baseUrl}/api/v1/update/${emplId}`,
        employee
      )
      .subscribe((response) => {
        console.log(response.message);
        this.employeeUpdated.next([...this.employees]);
      });
  }

  // delete employee by id
  deleteEmployee(id: string) {
    this.http
      .delete<{ status: string; message: string }>(
        `${this.baseUrl}/api/v1/delete/${id}`
      )
      .subscribe((res) => {
        console.log(res.status);
        this.employees = this.employees.filter((empl) => empl.id !== id);
        this.employeeUpdated.next([...this.employees]);
      });
  }
}
