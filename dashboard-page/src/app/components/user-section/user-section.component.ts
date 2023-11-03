import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserRq, UserData } from 'src/app/core/models/user.interface';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';
import { UserService } from 'src/app/core/services/user-service/user-service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent {
  
  isAuthorized = false;
  isEditUser = false;
  isChangePassword = false;
  users: UserData[] = [];

  editUser!: FormGroup;
  session_token: string;

  @Output() sessionChange = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder, 
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.editUser = fb.group({
      email: ['', [Validators.required, Validators.maxLength(300), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      rol: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      id: ['', [Validators.required]]
    });

    this.session_token = this.obtainToken();
    this.getUsers();
  }

  updateUser(user: UserData) {
    this.isEditUser = true;

    this.editUser.controls['name'].setValue(user.name);
    this.editUser.controls['email'].setValue(user.email);
    this.editUser.controls['password'].setValue(user.contrasena);
    this.editUser.controls['newPassword'].setValue(user.contrasena);
    this.editUser.controls['rol'].setValue(user.rol);
    this.editUser.controls['id'].setValue(user.id);

    this.isChangePassword = false;
  }

  deleteUser(id: number) {      
    this.userService.deleteUser(this.session_token, id).subscribe(
      (response)=>{
        console.log(response)
        alert(response.mensaje)
        if(response.api_code == 1) {
          this.isEditUser = false;
          this.getUsers();
        }
      }, 
      err => {
        this.handleError(err.status)
      }
    );
  }

  changePassword(event: boolean) {
    this.isChangePassword = event;
    const password = event ? null : this.editUser.controls['password'].value;
    this.editUser.controls['newPassword'].setValue(password);
    console.log(this.editUser.controls['newPassword'].value)
  }

  actionButton(event: boolean){
    if(event) {
      const password = this.isChangePassword ? this.editUser.controls['newPassword'].value : this.editUser.controls['password'].value;
      const request: UpdateUserRq = {
        id: this.editUser.controls['id'].value,
        name: this.editUser.controls['name'].value,
        email: this.editUser.controls['email'].value,
        rol: this.editUser.controls['rol'].value,
        contrasena: password,
        cambio_contrasena: this.isChangePassword
      }
  
      this.userService.updateUser(this.session_token, request).subscribe( 
        (response) => {
          alert(response.mensaje)
          if(response.api_code == 1) {
            this.isEditUser = false;
            this.getUsers();
          }
        }, 
        error => {
          this.handleError(error.status)
        }
      );
    } else {
      this.isEditUser = false;
    }
  }

  private getUsers(){
    this.userService.getUsers(this.session_token).subscribe( 
      (response) => {
        this.users = response.length > 0 ? response : [];
      }, error => {
        this.handleError(error.status)
      });
  }

  private obtainToken(){
    this.isAuthorized = this.storageService.getCurrentUser()?.rol === undefined || this.storageService.getCurrentUser()?.rol === 2;
    const session_token = this.storageService.getCurrentToken();

    if (session_token === null) {
      this.sessionChange.emit(true);
    }

    return session_token ?? '';
  }

  private handleError(status: number){
    if(status == 401) {
      this.sessionChange.emit(true)
    } else {
      alert("Ha ocurrido un error inesperado, intente nuevamente más tarde; HTTP CODE " + status)
    }
  }

}