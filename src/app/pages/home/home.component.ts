import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  posts = [];

  isLoading = false;
 
  
  constructor(private toastr: ToastrService,
              private db: AngularFireDatabase) { 
                this.isLoading = true;
                db.object('/users')
                .valueChanges()
                .subscribe((obj) => {
                  if(obj) {
                    this.users = Object.values(obj)
                    this.isLoading = false
                  } else {
                    toastr.error('NO USER FOUND');
                    this.users = [];
                    this.isLoading = false;
                  }
                });

                //grab posts
                db.object('/posts')
                .valueChanges()
                .subscribe((obj) => {
                  if(obj){
                    this.posts = Object.values(obj).sort((a, b) => b.date-a.date);
                    this.isLoading = false;
                  }else{
                    toastr.error('NO posts yet!');
                    this.posts = [];
                    this.isLoading = false;

                  }
                })
              }

  ngOnInit(): void {
  }

}
