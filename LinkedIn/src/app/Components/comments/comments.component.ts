import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/comments.service';
import { IComments } from '../Interfaces/comments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  allComments: IComments[] = [];
  commentsForPost: IComments[] = [];

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.loadAllComments();
  }

  loadAllComments() {
    this.commentsService.getAllComments().subscribe(
      (comments) => {
        console.log('Comments', comments);
        this.allComments = comments;
      },
      (error) => {
        console.error('Error loading all comments:', error);
      }
    );
  }
}
