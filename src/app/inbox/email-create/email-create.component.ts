import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal= false ;

  email:Email
  constructor(private authSv: AuthService, private emailService :EmailService) {
    this.email={
      to:'',
      from : `${authSv.userName}@angular-email.com`,
      subject : '',
      id: '',
      html :'',
      text :'',


    }
  }

  ngOnInit(): void {

  }

  createEmail(event:Email){
    this.emailService.sendEmail(event).subscribe(()=>{
      this.showModal=false
    })
  }
}
