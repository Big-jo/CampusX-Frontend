import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApi = environment.baseApi;
  private user = 'users';
  private getUser = 'getUser';

  private Source = new BehaviorSubject('default');
  Current = this.Source.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private userID = this.storageService.GetLocal('userID');

  public CreateUser(form) {
    return this.http.post(`${this.baseApi}/${this.user}/create`, form);
  }

  public LoginUser(form) {
    return this.http.post(`${this.baseApi}/${this.user}/login`, form);
  }

  send(object) {
    this.Source.next(object);
  }
  // TODO: Rename this method
  public GetUserInfo() {
    return this.http.get(`${this.baseApi}/${this.user}/${this.getUser}/${this.userID}/me`);
  }

  public GetUser(user: string, searchKey: string) {
    return this.http.get(`${this.baseApi}/${this.user}/${this.getUser}/${user}/${searchKey}`);
  }

  // Get users from own campus and other campuses
  public Explore() {
    return this.http.get(`${this.baseApi}/${this.user}/explore`);
  }

  // follow another user
  public Follow(targetID: string) {
    return this.http.post(`${this.baseApi}/${this.user}/follow`, {targetID});
  }

  public GetFollowNotifications() {
    return this.http.get(`${this.baseApi}/${this.user}/notification/follower`);
  }

  public CheckTag(tag) {
    return this.http.get(`${this.baseApi}/${this.user}/userTag/@${tag}`);
  }

  public updateFcmToken(token) {
    return this.http.post(`${this.baseApi}/${this.user}/fcmUpdate`, {fcm_token: token});
  }
}
