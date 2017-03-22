import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Student } from "./student";

@Component({
    selector: "student",
    templateUrl: "public/src/student/student.html",
    styleUrls: ["public/src/student/student.css"]
})
export class StudentComponent {
    @Input() public student: Student;
    @Output() edit: EventEmitter<Student> = new EventEmitter();
    @Output() delete: EventEmitter<Student> = new EventEmitter;

    public editingStudent: Student;
    public isEditing: boolean = false;

    public deleteStudent(): void {
        this.delete.emit(this.student);
    }

    public updateStudent(): void {
        this.edit.emit(this.editingStudent);
    }

    public toggleEditing(): void {
        this.isEditing = !this.isEditing;
        if (this.isEditing)
            //Deep copy student item before change
            this.editingStudent = new Student(
                this.student._id,
                this.student.firstName,
                this.student.lastName,
                this.student.age,
                this.student.isEnrolled);
    }

}
