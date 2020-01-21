import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent   implements OnInit {
  name = 'Angular';

   sampleJson =
    {
      "name": {
        "firstName": "John",
        "lastName": "Smith",
      },
      "personal": {
        "age": 42,
        "likesIceCream": true
      },
      "hobbies": [
        "football",
        "golf"
      ],
      "address": {
        "town": "townington",
        "county": "Shireshire", 

        "road": {
          "number": "1",
          "street": "the street"
        }
      }
    };

  myForm: FormGroup;
  myKeys=[];
  
    ngOnInit() {
    this.myForm = this.getFormGroupControls(this.sampleJson, this.myKeys, null);
    console.log("keys = > ", this.myKeys);
    //console.log("form = > ", this.myForm);
  }

    getFormGroupControls(json:any,keys, parent): FormGroup{
    let controls = {};
    let value = {};

    for (let key in json) {
      if (json.hasOwnProperty(key)) {

        value = json[key];
        if (value instanceof Object && value.constructor === Object) {

          keys.push({"key":key,children:[], fullKey: parent ? parent.fullKey + '.' + key: key}); 
          controls[key] = this.getFormGroupControls(value,keys[keys.length-1].children, keys[keys.length-1]);
        } else {

          keys.push({"key":key,children:[], fullKey: parent ? parent.fullKey + '.' + key: key});
          controls[key] = new FormControl(value); 

        }
      }
    }

    return new FormGroup(controls); 
  }

  getNodeKey(node) {
    return node.fullKey; 
  }

}

