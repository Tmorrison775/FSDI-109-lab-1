import { SharedService } from '../serice/shared.service';

export class Post{
    // class attributes

    public message : string;
    public to : string;
    public from : string;
    public createdOn : Date;
    public imageUrl: string;

    //constructor

    constructor(){
        this.to = "Everyone";
        this.createdOn = new Date();

    }

    //methods


}