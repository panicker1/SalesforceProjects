import { LightningElement, api } from 'lwc';
import getPrizeCount from '@salesforce/apex/KCTFinalPrizeController.getPrizeCountbyPrizeNameTourneyId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import trophyImages from '@salesforce/resourceUrl/Trophies';
import tournamentTrphyImages from '@salesforce/resourceUrl/TournamentTrophies';

export default class PrizeHeader extends LightningElement {
    prizeCount;
    @api tournamentId;

    trophy = tournamentTrphyImages + '/trophy.png';
    otherPrizes = trophyImages + '/Otherprizes.png';

       
    @api
    callPrizeCount(tourneyId, section){

        const localTourneyId = tourneyId? tourneyId:this.tournamentId;

        getPrizeCount({tournamentId : localTourneyId, section})
            .then((result)=>{
                this.prizeCount = result;                
            })
            .catch((error)=> {
                this.showToast('ERROR', error.body.message, 'error');

            });
    }

    get firstPrize(){
        return this.prizeCount?.['FirstPrize'];        
    }

    get secondPrize(){
        return this.prizeCount?.['SecondPrize'];        
    }
    get thirdPrize(){
        return this.prizeCount?.['ThirdPrize'];
    }

    get ratingPrize(){
        return this.prizeCount?.['RatingPrize'];
    }

    get roundOneLoserPrize(){
        return this.prizeCount?.['RoundOneLoserPrize'];
    }

    get veteranPrize(){
        return this.prizeCount?.['VeteranPrize'];
    }

    get juniorPrize(){
        return this.prizeCount?.['JuniorPrize'];
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