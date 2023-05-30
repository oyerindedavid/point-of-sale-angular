import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './manage/user/users/user';
import { Staff } from './manage/user/staffs/staff';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    
  ) { }

  private baseUrl = "http://localhost:8080";

  public deviceSource = new BehaviorSubject('');
  selectedDevice = this.deviceSource.asObservable();

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCurrentUser(): User{
    return JSON.parse(localStorage.getItem('user'))[0]
  }

  createAccount(account){
    return this.http.post(`${this.baseUrl}/api/v1/account`, account, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('addAccount'))
    );
  }

  getAllAccount(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/api/v1/account`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Account[]>('getAccount'))
    );
  }

  isAccountActive(): Boolean{
    return true;
  }

  createLocationArea(locationInfo){
    return this.http.post(`${this.baseUrl}/api/v1/locationarea`, locationInfo, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('CreateLocationArea'))
    );
  }

  getAlocationArea(account_id: number, location_area_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/locationarea/${location_area_id}/account/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getLocationAreas'))
    );
  }

  getLocationArea(account_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/locationarea/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getLocationAreas'))
    );
  }

  createDevice(deviceInfo){
    return this.http.post(`${this.baseUrl}/api/v1/device`, deviceInfo, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('CreateDeviceInfo'))
    );
  }

  getDevices(account_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/device/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getDevices'))
    );
  }

  getADevice(account_id: number, device_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/device/${device_id}/account/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getADevice'))
    );
  }

  updateDeviceInfo(data){
    return this.http.put(`${this.baseUrl}/api/v1/device/info`, data, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('updateDeviceInfo'))
    );
  }

  updateDevice(data){
    return this.http.put(`${this.baseUrl}/api/v1/device`, data, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('updateDeviceCode'))
    );
  }

  getDevicesByLocation(account_id: number, location_area_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/device/${account_id}/location/${location_area_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getDevicesByLocation'))
    );
  }

  getDevicesByDeviceId(account_id: number, device_id){
    return this.http.get(`${this.baseUrl}/api/v1/device/${account_id}/${device_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getDevicesByDeviceId'))
    );
  }

  getDevicesByDeviceCode(account_id: number, device_code : string){
    return this.http.get(`${this.baseUrl}/api/v1/device/${account_id}/code/${device_code}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getDevicesByDeviceCode'))
    );
  }

  isDeviceAssigned(account_id: number, device_code : string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/api/v1/device/${account_id}/assigned/${device_code}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<boolean>('getDevicesByDeviceCode'))
    ); 
  }

  createDeviceGroup(deviceGroupInfo){
    return this.http.post(`${this.baseUrl}/api/v1/devicegroup`, deviceGroupInfo, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('CreateDeviceInfo'))
    );
  }

  getDeviceGroups(account_id: number){
    return this.http.get(`${this.baseUrl}/api/v1/devicegroup/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getDeviceGroups'))
    );
  }

  createUser(user){
    return this.http.post(`${this.baseUrl}/api/v1/user`, user, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('createUser'))
    );
  }

  isUserCreated(user: User): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/user/validity`, user, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<User>('isUserCreated'))
    );
  }

  createStaff(staff){
    return this.http.post(`${this.baseUrl}/api/v1/staff`, staff, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('createStaff'))
    );
  }

  isStaffCreated(staff: Staff): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/staff/validity`, staff, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<User>('isUserCreated'))
    );
  }

  getAllStaff(account_id): Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.baseUrl}/api/v1/staff/${account_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Staff[]>('getStaff'))
    );
  }

  addModule(moduleInfo): Observable<String>{
    return this.http.post<String>(`${this.baseUrl}/api/v1/posmodule/module`, moduleInfo, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<String>('saveModule'))
    );
  }

  getAllModule(){
    return this.http.get(`${this.baseUrl}/api/v1/posmodule`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getAllModule'))
    );
  }

  getAModule(id: number){
    return this.http.get(`${this.baseUrl}/api/v1/posmodule/${id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError('getAModule'))
    );
  }

  
}
