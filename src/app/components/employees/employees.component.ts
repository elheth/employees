import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  private mode = 'create';
  private emplId: string;
  employee: Employee;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // check if the router path in edit/ create mode then get the employee
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('emplId')) {
        this.mode = 'edit';
        this.emplId = paramMap.get('emplId');
        this.apiService
          .getEmployee(this.emplId)
          .subscribe((res) => (this.employee = res.data));
      } else {
        this.mode = 'create';
        this.emplId = null;
      }
    });
  }

  // Add/update the emloyee and navigate to home page
  onAdd(f: NgForm) {
    console.log(f.value);
    if (this.mode === 'create') {
      this.apiService.addEmployee(f.value.name, f.value.salary, f.value.age);
    } else {
      this.apiService.updateEmployee(
        this.emplId,
        f.value.name,
        f.value.salary,
        f.value.age
      );
    }
    f.reset();
    this.router.navigate(['/']);
  }
}
