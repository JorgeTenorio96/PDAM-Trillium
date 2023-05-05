import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string | undefined;
  password: string | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {

    this.router.navigateByUrl('/posts');
  }

}
