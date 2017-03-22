import { Student } from "../student/student";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
    constructor(private http: Http) { }

    public createNewStudent(student: Student): Observable<any> {
        //sending request to server...
        let url: string = "/students/add";
        let observable: Observable<Response> = this.http.post(url, student);
        return observable.catch(this.handleStudentError);
    }

    public getAllStudents(): Observable<Student[]> {
        let url: string = "/students";
        let observable: Observable<Response> = this.http.get(url);
        let studentObservable: Observable<Student[]> =
            observable
                .map(this.parseStudentResponse)
                .catch(this.handleStudentError);
        return studentObservable;
    }

    public deleteStudent(student: Student): Observable<any> {
        //Sending delete request
        let url: string = "/students/delete";
        let observable: Observable<Response> = this.http.post(url, student);
        return observable.catch(this.handleStudentError);
    }

    private parseStudentResponse(res: Response): Student[] {
        return res.json() as Student[];
    }

    private handleStudentError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public updateStudent(student: Student): Observable<any> {
        let url: string = "/students/update";
        let observable: Observable<Response> = this.http.post(url, student);
        return observable.catch(this.handleStudentError);
    }
}