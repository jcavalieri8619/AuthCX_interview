import {Component, Input, OnInit} from '@angular/core';
import {UserMessageService} from '../services/user-message.service';
import {IUserMessage} from '../models/user-message';
import {MatDialog} from '@angular/material/dialog';
import {MessageListDialogComponent} from '../message-list-dialog/message-list-dialog.component';
import {IUser} from '../models/user';
import {IMessage} from '../models/message';
import {IUserMessagesByKey} from '../models/user-messages-by-key';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input('userList') users: IUser[] = [];
  @Input('userMessagesByUser') userMessagesByUser: IUserMessagesByKey[] = [];
  @Input('messageCount') totalMessages: number = 0;

  messageByKey: Record<string, IUserMessage[]> = {};

  constructor(private messagesService: UserMessageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    for (const val of this.userMessagesByUser) {
      this.messageByKey[val.key] = val.messages;
    }
  }

  getMessagesForUser(user: IUser) {
    this.messagesService.getMessages(user.id).subscribe(value => {
      this.openDialog(user, value);
    });
  }

  private openDialog(user: IUser, messages: IMessage[]) {
    const dialogRef = this.dialog.open(MessageListDialogComponent, {
      autoFocus: true,
      width: '950px',
      data: {key: user.userName, messages}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
