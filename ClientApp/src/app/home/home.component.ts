import {Component, OnInit} from '@angular/core';
import {asyncScheduler, BehaviorSubject, Subject} from 'rxjs';
import {UserMessageService} from '../services/user-message.service';
import {IUserMessagesByKey} from '../models/user-messages-by-key';
import {IUser} from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalMessages: number;
  messagesByUser: IUserMessagesByKey[];
  userList: IUser[];
  finishedLoading$: Subject<boolean> = new Subject<boolean>();

  finishedUsers = false;
  finishedByUser = false;
  finishedCount = false;

  constructor(private messagesService: UserMessageService) {
    this.finishedLoading$.next(false);
  }

  ngOnInit() {

    this.messagesService.getUsers().subscribe(value => {
      this.userList = value;
      this.finishedUsers = true;

      asyncScheduler.schedule(state => this.finishedLoading$.next(this.finishedUsers &&
        this.finishedByUser &&
        this.finishedCount), 330);
    });

    this.messagesService.getMessagesByAggUserId().subscribe(value => {
      this.messagesByUser = value;
      this.finishedByUser = true;

      asyncScheduler.schedule(state => this.finishedLoading$.next(this.finishedUsers &&
        this.finishedByUser &&
        this.finishedCount), 330);

    });

    this.messagesService.getTotalMessageCount().subscribe(value => {
      this.totalMessages = value;
      this.finishedCount = true;

      asyncScheduler.schedule(state => this.finishedLoading$.next(this.finishedUsers &&
        this.finishedByUser &&
        this.finishedCount), 330);

    });
  }

}
