import { LightningElement, api, wire} from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import tourneyImages from '@salesforce/resourceUrl/TournamentImages';

export default class PlayerCard extends LightningElement {
    @api playerRecord;
    @api imageUrl;   

    prizeTag;  
    containerTag;
    shakeImage;
    formattedAmount;
    imageAvailable;

    @wire(CurrentPageReference) pageRef;

    trophy = tourneyImages + '/trophy.png';
    userPic = tourneyImages + '/userPic.jpeg';

    



    renderedCallback(){       

        console.log('playerRecord : ' + this.playerRecord);
        
        if(this.playerRecord.Prize_Amount__c){
            this.formattedAmount = '£' + (Math.round(this.playerRecord.Prize_Amount__c*100)/100).toFixed(2);   
           
        }

        if(this.imageUrl){
            this.imageAvailable = true;
        }
        else
        {
            this.imageAvailable = false;
        }
        
        if(this.playerRecord.Prize_Name__c == 'First Prize'){
            //this.prizeTag = 'firstPrize' + ' player-header';
            this.prizeTag = 'firstPrize' + ' slds-text-heading_large';
            this.containerTag = 'firstPrize' + ' card-container';
        }
        else if(this.playerRecord.Prize_Name__c == 'Second Prize'){
            this.prizeTag = 'secondPrize' + ' slds-text-heading_large';
            this.containerTag = 'secondPrize' + ' card-container';
        }
        else if(this.playerRecord.Prize_Name__c == 'Third Prize'){
            this.prizeTag = 'thirdPrize' + ' slds-text-heading_large';
            this.containerTag = 'thirdPrize' + ' card-container';


        }
        else if(this.playerRecord.Prize_Name__c == "Rating Prize"){
            this.prizeTag = 'ratingPrize' + ' slds-text-heading_large';
            this.containerTag = 'ratingPrize' + ' card-container';

        }
        else if(this.playerRecord.Prize_Name__c == "Round One Loser Prize"){
            this.prizeTag = 'roundOneLoserPrize' + ' slds-text-heading_large';
            this.containerTag = 'roundOneLoserPrize' + ' card-container';
            
        }
        else if(this.playerRecord.Prize_Name__c == "Veteran Prize"){
            this.prizeTag = 'veteranPrize' + ' slds-text-heading_large';
            this.containerTag = 'veteranPrize' + ' card-container';
            
        }
        else if(this.playerRecord.Prize_Name__c == "Junior Prize"){
            this.prizeTag = 'juniorPrize' + ' slds-text-heading_large';
            this.containerTag = 'juniorPrize' + ' card-container';
            
        }
        else
        {
            this.prizeTag = 'defaultPrize' + ' slds-text-heading_large';
            this.containerTag = 'defaultPrize' + ' card-container';
        }       
    }

    get firstPrizeWinner(){
        if(this.playerRecord.Prize_Name__c == 'First Prize'){
            this.shakeImage = 'shake';
            return true;
        }
        this.shakeImage = 'shake';
        false;
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
            this.playerRecord =  {};
            this.imageUrl = null;
            this.formattedAmount = null;
        }
    }

    onTourneyChangeHandler(payload){
        console.log ('Tourney Payload : ' + payload);
        if(payload){          
            this.playerRecord =  {};
            this.imageUrl = null;
        }
    }




}