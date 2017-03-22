import { Component } from "@angular/core";
import { Student } from "./student";
import { StudentService } from "../services/student.service";

@Component({
    selector: "student-list",
    templateUrl: "public/src/student/student.list.html",
    providers: [StudentService]
})
export class StudentListComponent {
    private defaultStudent: Student = new Student(null, "Default", "Default", 0, false);

    public newStudent: Student;
    constructor(private service: StudentService) {
        this.newStudent = this.defaultStudent;
        this.refreshStudentList();
    }

    public studentList: Student[] = [];
    public isEditorOpen: boolean = false;

    get editorButtonLabel(): string {
        if (this.isEditorOpen) {
            return "Close Editor";
        } else {
            return "Open Editor";
        }
    }

    public refreshStudentList(): void {
        this.service.getAllStudents().subscribe(
            (students: Student[]) => this.studentList = students
        );
    }

    public createNewStudent(): void {
        //send request to server to create new student
        this.service.createNewStudent(this.newStudent).subscribe();
        this.newStudent = this.defaultStudent;
        this.isEditorOpen = false;
        this.refreshStudentList();
    }
    public toggleEditor(): void {
        this.isEditorOpen = !this.isEditorOpen;
    }

    public deleteStudent(student: Student): void {
        this.service
            .deleteStudent(student)
            .subscribe((ret: any) => {
                this.refreshStudentList();
            });
    }

    public updateStudent(student: Student): void {
        this.service
            .updateStudent(student)
            .subscribe((ret: any) => {
                this.refreshStudentList();
            });
    }
}