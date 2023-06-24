import { LightningElement, api, wire} from 'lwc';
//import { registerListener, unregisterAllListeners } from 'c/pubsub';
//import { CurrentPageReference } from 'lightning/navigation';
import tourneyImages from '@salesforce/resourceUrl/TournamentImages';

export default class PlayerCardResponsive extends LightningElement {
    @api individualRecord;
    @api individualImageUrl;   


   

    //@wire(CurrentPageReference) pageRef;

    trophy = tourneyImages + '/trophy.png';
    userPic = tourneyImages + '/userPic.jpeg';

    renderedCallback(){   
        
        console.log(' individualRecord : ' + JSON.stringify(this.individualRecord));
        console.log(' image URL : ' + this.individualimageUrl);

    }



   
    

   /* connectedCallback(){
        registerListener('pubsubtabchange', this.onChangeHandler, this);

        registerListener('pubsubtourneychange', this.onChangeHandler, this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    onChangeHandler(payload){
        console.log ('Payload : ' + payload);
        if(payload){          
            this.playerRecord =  {};
            this.imageUrl = null;
        }
    }*/

}