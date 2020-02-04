import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserMessage} from '../models/user-message';
import {catchError, retry, tap} from 'rxjs/operators';
import {handleError, log} from './service-utils';
import {IUserMessagesByKey} from '../models/user-messages-by-key';
import {IMessage} from '../models/message';
import {IUser} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {

  private readonly serviceName = 'UserMessageService';
  private readonly controllerUrl;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.controllerUrl = baseUrl + 'api/MessageInfo';
  }

  public getUserMessages(userId?: string): Observable<IUserMessage[]> {
    const url = `${this.controllerUrl}/GetUserMessages?userId=${userId || ''}`;
    return this.http.get<IUserMessage[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched user-messages: ${(x || []).length}`)),
      catchError(handleError<IUserMessage[]>(this.serviceName,
        'getUserMessages', true, [])));

  }

  public getMessages(userId?: string): Observable<IMessage[]> {
    const url = `${this.controllerUrl}/GetMessages?userId=${userId || ''}`;
    return this.http.get<IMessage[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched messages: ${(x || []).length}`)),
      catchError(handleError<IMessage[]>(this.serviceName,
        'getMessages', true, [])));

  }

  public getMessagesWithPhrase(phrase: string, userId?: string): Observable<IMessage[]> {
    const url = `${this.controllerUrl}/MessagesWithWordPhrase?userId=${userId || ''}&phrase=${phrase || ''}`;
    return this.http.get<IMessage[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched messagesWithWordsPhrases: ${(x || []).length}`)),
      catchError(handleError<IMessage[]>(this.serviceName,
        'getMessagesWithPhrase', true, [])));

  }

  public getUsers(userId?: string): Observable<IUser[]> {
    const url = `${this.controllerUrl}/GetUsers?userId=${userId || ''}`;
    return this.http.get<IUser[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched users: ${(x || []).length}`)),
      catchError(handleError<IUser[]>(this.serviceName,
        'getUsers', true, [])));

  }

  public getTotalMessageCount(userId?: string): Observable<number> {
    const url = `${this.controllerUrl}/CountMessages?userId=${userId || ''}`;
    return this.http.get<number>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched totalMessageCount: ${x}`)),
      catchError(handleError<number>(this.serviceName,
        'getTotalMessageCount', true, 0)));

  }

  public getMessagesByAggEmailDomain(domain?: string): Observable<IUserMessagesByKey[]> {
    const url = `${this.controllerUrl}/AggregateEmailDomain?domain=${domain || ''}`;
    return this.http.get<IUserMessagesByKey[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched ${(x || []).length} messages by agg email domain:  ${JSON.stringify(x)}`)),
      catchError(handleError<IUserMessagesByKey[]>(this.serviceName,
        'getMessagesByAggEmailDomain', true, [])));

  }

  public getMessagesByAggUserId(userId?: string): Observable<IUserMessagesByKey[]> {
    const url = `${this.controllerUrl}/AggregateUserId?userId=${userId || ''}`;
    return this.http.get<IUserMessagesByKey[]>(url).pipe(
      retry(2),
      tap(x =>
        log(this.serviceName,
          `fetched ${(x || []).length} messages by agg userId:   ${JSON.stringify(x)}`)),
      catchError(handleError<IUserMessagesByKey[]>(this.serviceName,
        'getMessagesByAggUserId', true, [])));

  }

}
