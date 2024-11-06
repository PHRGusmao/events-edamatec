import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements ControlValueAccessor {
  @Input() title: string = "Cadastrar Task";
  @Input() primaryBtnText: string = "Cadastrar";
  @Input() secondaryBtnText: string = "Cancelar";
  @Input() disablePrimaryBtn: boolean = true;

  @Output() onSubmit = new EventEmitter();
  @Output() onNavigate = new EventEmitter();

  taskForm: FormGroup;
  value: any = {};
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completionDate: ['', Validators.required],
      status: [false]
    });

    this.taskForm.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngOnInit() {
    this.taskForm.valueChanges.subscribe(() => {
      this.disablePrimaryBtn = !this.taskForm.valid;
    });
  }

  writeValue(value: any): void {
    this.value = value;
    if (value) {
      this.taskForm.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.taskForm.disable();
    } else {
      this.taskForm.enable();
    }
  }

  submit() {
    if (this.taskForm.valid) {
      const formData = { ...this.taskForm.value };
      formData.completion_date = formData.completionDate instanceof Date 
        ? formData.completionDate.toISOString().split('T')[0]
        : formData.completionDate;
      
      this.onSubmit.emit(formData);
    } else {
      this.toastr.error('Formulário inválido! Preencha todos os campos.');
    }
  }

  navigate() {
    this.onNavigate.emit();
  }
}
