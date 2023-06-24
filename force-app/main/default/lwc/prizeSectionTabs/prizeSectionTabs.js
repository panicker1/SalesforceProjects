import { LightningElement , api, wire } from 'lwc';
import getPrizes from '@salesforce/apex/KCTFinalPrizeController.getPrizesbySectionTourneyId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class PrizeSectionTabs extends LightningElement {
    
    activeTab;
    @api tournamentId;
    finalPrizes = [];
    activateTab = false;

    @wire(CurrentPageReference) pageReference;
    
    
   
    handleActiveTab(event){
        this.activeTab = event.target.value;  
        this.callGetPrizes(this.tournamentId); 
        const sectionTabChangeEvent = new CustomEvent('sectionchange',{detail : this.activeTab});
        this.dispatchEvent(sectionTabChangeEvent);
        this.activateTab = true;    
        fireEvent(this.pageReference, 'pubsubtabchange', this.activateTab);    
    }

        

    @api
    callGetPrizes(tourneyId){

       
        const localTourneyId = tourneyId ? tourneyId:this.tournamentId;      

        getPrizes({ tournamentId : localTourneyId, section : this.activeTab})
        .then(result => 
            {
                this.finalPrizes = result;                   
            }
        )
        .catch(error => {                
            this.showToast('ERROR', error.body.message, 'error');
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

  
}