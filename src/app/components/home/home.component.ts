import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emplName: string;
  employees: Employee[];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // get all employees
    this.apiService.getEmployees();
    this.apiService
      .getUpdatedEmployee()
      .subscribe((res: Employee[]) => (this.employees = res));
  }

  // delete by id
  onDelete(id: string) {
    //console.log(id)
    this.apiService.deleteEmployee(id);
  }

  // search employee by comparing employee-name and input-value
  onSearch() {
    if (this.emplName === '') {
      this.ngOnInit();
    } else {
      this.employees = this.employees.filter((empl) => {
        return empl.employee_name
          .toLocaleLowerCase()
          .match(this.emplName.toLocaleLowerCase());
      });
    }
  }
}
