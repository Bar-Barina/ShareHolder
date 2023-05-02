import { Component, OnInit, OnDestroy } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { Observable, Subscription } from 'rxjs';
import {
    ChartData,
} from 'src/app/models/chart-data.model';
@Component({
    selector: 'statistics-page',
    templateUrl: './statistics-page.component.html',
    styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
    constructor(private bitcoinService: BitcoinService) { }
    marketPriceStr = 'market-price';
    avgBlockSizeStr = 'avg-block-size';
    tradeVolumeStr = 'trade-volume';
   
    marketPrice$!: Observable<ChartData>;
    avgBlockSize$!: Observable<ChartData>;
    tradeVolume$!: Observable<ChartData>;
    display: string = this.marketPriceStr;
    
    ngOnInit(): void {
        this.avgBlockSize$ = this.bitcoinService.fetchData(this.avgBlockSizeStr)
        this.marketPrice$ = this.bitcoinService.fetchData(this.marketPriceStr)
        this.tradeVolume$ = this.bitcoinService.fetchData(this.tradeVolumeStr)
            
    }
}
