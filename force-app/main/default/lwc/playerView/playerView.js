import { LightningElement, api, wire, track } from 'lwc';
import tourneyImages from '@salesforce/resourceUrl/TournamentImages';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class PlayerView extends LightningElement {

    @api recordId;
    @api objectApiName = 'Final_Prize__c';
    @api imageUrl;

    prizeTag;  
    containerTag;
    shakeImage;
    formattedAmount;
    imageAvailable;
    @track displayCard = true;

    trophy = tourneyImages + '/trophy.png';
    userPic = tourneyImages + '/userPic.jpeg';

    @wire(CurrentPageReference) pageRef;
    

    renderedCallback(){
        if(this.imageUrl){
            this.imageAvailable = true;
        }
        else
        {
            this.imageAvailable = false;
        }
    }

    connectedCallback(){
        registerListener('pubsubtabchange', this.onChangeHandler, this);

        registerListener('pubsubtourneychange', this.onChangeHandler, this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    onChangeHandler(payload){
        console.log ('Payload : ' + payload);
        if(payload){          
            this.displayCard = false;
            console.log ('displayCard : ' + this.displayCard);
        }  
        this.displayCard = true;      
    }

}