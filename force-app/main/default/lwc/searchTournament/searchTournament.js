import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ProfileName from '@salesforce/schema/User.Profile.Name';
import Id from '@salesforce/user/Id';
import getTournaments from '@salesforce/apex/KCTFinalPrizeController.getChildTournaments';

export default class SearchTournament extends LightningElement {    
    userId = Id;
    userProfileName;
    tournaments;   
    error;
   
    handleChange(event) {
        this.value = event.detail.value;
    }

    connectedCallback(){
        this.populateTournaments();
    }

    populateTournaments(){
        getTournaments()
            .then(result=>{ 
                this.formatData(result);
            })
            .catch(error => {
                this.error = error;
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

    
   