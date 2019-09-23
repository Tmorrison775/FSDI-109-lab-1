import { SharedService } from '../serice/shared.service';
import { Data } from '@angular/router';

export class Friend{

    public name : string = ""; //the actual name of the friend
    public belongsTo: string = ""; //to specify that this friend is on my friendslist
    
    
    /*Fire Base id used to remove the object from db*/

    public fbId : string = '';
    constructor(){

        
        
        
    }
}