import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  dataArray: any = [];
  editObj: any = {};
  name: any;
  age: any;
  qualification: any;
  in = 0;
  buttonText = 'Submit';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      age: [null, Validators.required],
      qualification: [null, Validators.required],
    });

    if (JSON.parse(localStorage.getItem('data')!))
      this.dataArray = JSON.parse(localStorage.getItem('data')!);
    this.in = this.dataArray?.length;

    if (this.route.snapshot.params['id']) {
      this.buttonText = 'Update';

      if (this.dataArray) {
        this.editObj = this.dataArray.find(
          (cou: any) => cou.id == this.route.snapshot.params['id']
        );
      }

      if (this.editObj) {
        this.form.patchValue({
          name: this.editObj.name,
          age: this.editObj.age,
          qualification: this.editObj.qualification,
        });
      }
    }
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.route.snapshot.params['id']) {
      this.dataArray.splice(
        this.route.snapshot.params['id'],
        1,
        this.form.value
      );
    } else {
      this.form.value.id = this.in + 1;
      this.dataArray.push(this.form.value);
    }
    localStorage.setItem('data', JSON.stringify(this.dataArray));
    this.router.navigate(['/table']);
  }
}
