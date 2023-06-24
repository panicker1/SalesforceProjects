import { LightningElement, api } from 'lwc';
import getPlayerImage from '@salesforce/apex/KCTFinalPrizeController.getPlayerImage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Name', fieldName: 'Entrant_Name__c' },  
    { label: 'Rating', fieldName: 'Rating__c'},
    { label: 'Points', fieldName: 'Points__c'},  
    { label: 'Prize', fieldName: 'Prize_Name__c'},
    { label: 'Amount', fieldName: 'Final_Prize_Amount__c', type: 'currency', typeAttributes: { currencyCode: 'GBP', maximumSignificantDigits: 4}, cellAttributes: {
        alignment: 'left'
    }},
    {label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'Details', name: 'show_details', title: 'Click to View Details'}}   
];

export default class FinalPrizeList extends LightningElement {

    @api finalPrizes;
    columns = columns;
    imageUrl;
    record = {};       
   

    handleRowAction(event){        
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'show_details':                
                this.showRowDetails(row);
                break;           
        }
    }

    showRowDetails(row) {
        this.record = row;
        console.log(JSON.stringify(this.record));
        this.callPlayerImage();        
    }

    callPlayerImage(){
        getPlayerImage({finalPrzRecordId : this.record.Id})
            .then(result=>{
                this.imageUrl = result;                
            })
            .catch(error=>{
                this.showToast('ERROR', error.body.message, 'error');
            })

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