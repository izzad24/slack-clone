import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { FormControl, Validators } from '@angular/forms';
import { Data} from '../interfaces/data'

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  chatData: Data[]
  messages: string[]
  selectedIdx: number
  currentUser: string
  errMessage: string

  newMsg = new FormControl('',[Validators.required ,Validators.maxLength(255)])
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.selectedIdx.subscribe(value => {
      this.selectedIdx = value
      const currentdata = this.dataService.privateMessages.getValue()
      this.chatData = currentdata
    })
    this.dataService.currMsgShown.subscribe(value => {
        this.messages = value
    })

    this.dataService.currUser.subscribe(value => {
      this.currentUser = value
    })
  }

  onClick(idx){
    this.dataService.isSelected(idx)
  }

  onSubmit(){
    if (!this.newMsg.invalid)
    {this.dataService.updateMsg(this.newMsg.value,this.selectedIdx)}
  }

  getErrorMessages(){
    let errorMessages = []
    let errors = this.newMsg.errors
    if(errors){
      for(let errorKey of Object.keys(errors)){
        
        if(errorKey === "required"){
          errorMessages.push("Message cannot be blank")
        }
        if(errorKey === "maxlength"){
          errorMessages.push("message cannot exceed 255 characters. Your current character length is " + errors[errorKey].actualLength)
        }
      }
    }
    return errorMessages
  }
}
