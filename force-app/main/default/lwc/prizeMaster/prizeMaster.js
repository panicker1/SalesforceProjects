import { LightningElement, wire, api } from 'lwc';
import getTournaments from '@salesforce/apex/KCTFinalPrizeController.getChildTournaments';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import ProfileName from '@salesforce/schema/User.Profile.Name';
import Id from '@salesforce/user/Id';
import tourneyImages from '@salesforce/resourceUrl/TournamentImages';

export default class PrizeMaster extends LightningElement {

    tournaments;  
    @api value; 
    @api section;
    selectedLabel;
    userId = Id;
    userProfileName;
    tourneyChange = false;
    exeterHallPath = tourneyImages + '/ExeterHallSite.jpg'

    @wire(CurrentPageReference) pageReference;

    get guestUser(){
        if(!this.userProfileName || this.userProfileName === 'chessprizes Profile'){
            return true;
        }
        return false;
    }
       
    handleChange(event) {
        this.value = event.detail.value;        
        this.selectedLabel = event.target.options.find(opt => opt.value === event.detail.value).label;

        console.log('Selected Lable : '+ this.selectedLabel);

        const prizeSectionComp = this.template.querySelector('c-prize-section-tabs');
        prizeSectionComp.callGetPrizes(this.value);

        const prizeHeaderComp = this.template.querySelector('c-prize-header');
        prizeHeaderComp.callPrizeCount(this.value,this.section);

        this.tourneyChange = true;
        console.log('Before tourney fire Event');
        fireEvent(this.pageReference, 'pubsubtourneychange', this.tourneyChange);    

       
    }

    connectedCallback(){
        this.populateTournaments();
    }

    populateTournaments(){
        getTournaments()
            .then(result=>{ 
                this.formatData(result);
                //this.value = this.tournaments[1].value;
                this.selectedLabel = this.tournaments[1].label;
            })
            .catch(error => {
                this.showToast('ERROR', error.body.message, 'error');
            });
        }

    formatData(result){
        this.tournaments = [{value:'', label:''}];
        result.forEach(element=> {
            const tournament ={};
            tournament.label = element.Name;
            tournament.value = element.Id;

            this.tournaments.push(tournament);

        });     
    
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    onSectionChangeHandler(event){    
        this.section = event.detail;

        const prizeHeaderComp = this.template.querySelector('c-prize-header');
        prizeHeaderComp.callPrizeCount(this.value,this.section);       

    }

    @wire(getRecord, { recordId: Id, fields: [ ProfileName] })
    userDetails({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {    
           console.log(data);        
            if (data.fields.Profile.value != null) {
                this.userProfileName = data.fields.Profile.value.fields.Name.value;
            }             
        }
    }

}