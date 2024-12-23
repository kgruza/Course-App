import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs';

let API_URL="http://localhost:8765/user-service/service/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

public currentUser: Observable<User | null>;
private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
this.currentUser = this.currentUserSubject.asObservable();

   }

   public get currentUserValue(): User | null{
    return this.currentUserSubject.value;
   }

   login(user: User):Observable<any>{
    const headers = new HttpHeaders(
      user ? {
        authorization:'Basic ' + btoa(user.username + ':' + user.password)
      }:{}
    );
    return this.http.get<any>(API_URL + "login", {headers : headers}).pipe(
     map(response =>{
      if(response){
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }
      return response;
     }) 
    );
   
  }

  logout(): Observable<any>{
    return this.http.post(API_URL + "logoutt", {}).pipe(
      // return this.http.get(API_URL + "test", {responseType: 'text'}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }



  register(user: User): Observable<any>{
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers : {"Content-Type": "application/json; charset=UTF_8"}});
  }
}
