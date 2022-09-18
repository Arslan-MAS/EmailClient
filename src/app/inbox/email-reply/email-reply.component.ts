import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  showModal=false

  @Input() email! :Email
  constructor(private emailService :EmailService) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.email = {
      ...this.email,
      from:this.email.to,
      to:this.email.from,
      subject:`Re: ${this.email.subject}`,
      text:`\n\n\n....${this.email.from} wrote:\n> ${this.email.text.replace(/\n/gi,'\n> ')}`
    }

  }
  replyEmail(email:Email){

    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal= false
    })
  }

}
