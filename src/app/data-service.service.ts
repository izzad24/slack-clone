import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from './interfaces/data'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  privateMessages = new BehaviorSubject<Data[]>(
    [{
      userId: 121,
      userName: "John Doe",
      msg: [
        "John Doe: Hi There!",
        "You: Hi There!",
        "John Doe: How are things going?"
    ]
    },
    {
      userId: 122,
      userName: "Catherine",
      msg: [
        "Catherine: Hi There!",
        "You: Hi There!",
        "Catherine: How are things going?"
    ]
    },
    {
      userId: 123,
      userName: "Kathy",
      msg: [
        "Kathy: Hi There!",
        "You: Hi There!",
        "Kathy: How are things going?"
    ]
    }
    ]
  )
  
  selectedIdx = new BehaviorSubject<number>(null)
  currUser = new BehaviorSubject<string>("Messages")
  currUserId = new BehaviorSubject<number>(121)
  currMsgShown = new BehaviorSubject<string[]>(["Please select user at sidebar to begin chatting"])

  isSelected(newIsSelected: number){
    this.selectedIdx.next(newIsSelected)
    const data = this.privateMessages.getValue()
    this.currUser.next(data[newIsSelected].userName)
    this.currUserId.next(data[newIsSelected].userId)
    this.currMsgShown.next(data[newIsSelected].msg)
  }

  updateMsg(newMsg: string, userIdx: number){
    const msg = this.currMsgShown.getValue()
    msg.push("You: " + newMsg)
  }
  constructor() { }

}
