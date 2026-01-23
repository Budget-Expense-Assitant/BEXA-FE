import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent {
  @Input() isOpen = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() saveExpense = new EventEmitter<any>();

  expenseForm: FormGroup;
  
  categories = ['Essen', 'Miete', 'Shoppen', 'Spaß', 'Transport', 'Sonstiges'];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      category: ['', Validators.required],
      merchant: [''],
      description: ['']
    });
  }

  onCancel() {
    this.expenseForm.reset({
      date: new Date().toISOString().substring(0, 10)
    });
    this.closeDialog.emit();
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.saveExpense.emit(this.expenseForm.value);
      this.onCancel();
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
}