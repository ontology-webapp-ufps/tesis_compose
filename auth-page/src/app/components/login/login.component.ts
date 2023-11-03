import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from 'src/app/core/models/session.interface';
import { LoginRq } from 'src/app/core/models/user.interface';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';
import { UserService } from 'src/app/core/services/user-service/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loader = false;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
    });
  }

  actionButton() {
    const request: LoginRq = {
      email: this.loginForm.controls['email'].value,
      contrasena: this.loginForm.controls['password'].value
    }
    this.userService.doLogin(request).subscribe((response) => {
      alert(response.mensaje)

      const session: Session = {
        token: response.token ?? '',
        user: response.user ?? {
          name: 'undefined',
          email: 'undefined',
          rol: -1,
          id: -1
        }
      }

      if(response.api_code == 1 && session.token !== '' && session.user.id !== -1) {
        this.storageService.setCurrentSession(session);
        const base_url = window.location.href.split('/auth')[0];
        window.location.href = base_url + '/dashboard';
      } else {
        this.loginForm.controls['password'].setValue(null);
        this.loginForm.controls['email'].setValue(null);
      }
    })
  }

}
