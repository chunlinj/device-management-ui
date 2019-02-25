import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {TokenType} from './TokenType.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[ i ].markAsDirty();
        this.loginForm.controls[ i ].updateValueAndValidity();
      }
    }

    if (!this.loginForm.valid) {
      console.log('校验失败');
      return;
    }
    const {userName, password} = this.loginForm.value;
    const loginParams = {
      username: userName,
      password
    };
    this.loginService.login(loginParams).subscribe((res: TokenType ) => {
      console.log('OK', res);
      /*进行本地token缓存的添加*/
      localStorage.setItem('token' , res.token);
      this.router.navigate(['/home']);
    });
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router
              ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [ 'zqran', [ Validators.required , Validators.maxLength(6), Validators.minLength(3)] ],
      password: [ '123456', [ Validators.required , Validators.pattern(/^[a-zA-Z0-9]{3,6}$/)] ],
      remember: [ true ]
    });
  }

}
