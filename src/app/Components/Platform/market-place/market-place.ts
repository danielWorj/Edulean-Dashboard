import { Component, signal } from '@angular/core';
import { MarketPlaceService } from '../../../Core/Service/MarketPlace/market-place-service';
import { Ressource } from '../../../Core/Model/MarketPlace/Ressource';
import { TypeRessource } from '../../../Core/Model/MarketPlace/TypeRessource';

@Component({
  selector: 'app-market-place',
  imports: [],
  templateUrl: './market-place.html',
  styleUrl: './market-place.css',
})
export class MarketPlacePlatform {
  constructor(private marketPlaceService : MarketPlaceService) {}

  listRessource = signal<Ressource[]>([]);

  getAllRessource() {
    this.marketPlaceService.findMarketplaceItems().subscribe({
      next: (ressources:Ressource[]) => {
        this.listRessource.set(ressources);
      },
      error: (err) => {
        console.error('Error fetching ressources:', err);
      }
    });
  }

  listTypeRessource=signal<TypeRessource[]>([]); 
  getAllTypeRessource(){
    this.marketPlaceService.findAllTypeRessource().subscribe({
      next: (typeressources:TypeRessource[]) => {
        this.listTypeRessource.set(typeressources);
      },
      error: (err) => {
        console.error('Error fetching ressources:', err);
      }
    });
  }
}
