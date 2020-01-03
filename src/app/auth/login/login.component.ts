import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[]= []
  notifyMessage: string= ''

  constructor(private fb: FormBuilder, 
              private auth: AuthService, 
              private router: Router,
              private route: ActivatedRoute,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.initForm()

    this.route.params.subscribe(
      (params)=>{
        if(params['registered']==='success'){
          this.notifyMessage = 'You have successfully registered. You can login now!!'
        }
      }
    )
  }
  initForm(){
     this.loginForm = this.fb.group({
       email: ['', [Validators.required, 
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
       password: ['', Validators.required]
     })
  }

  isInvalidForm(fieldName):boolean {
    return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName):boolean{
    return this.loginForm.controls[fieldName].errors.required
  } 

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      ()=>{
        this.toastr.successToastr('Hello!! ' + this.auth.getUsername(),'Welcome')
        this.router.navigate(['/rentals'])
      },
      (errorResponse)=>{
          this.errors = errorResponse.error.errors
      }
    )
  }

}
