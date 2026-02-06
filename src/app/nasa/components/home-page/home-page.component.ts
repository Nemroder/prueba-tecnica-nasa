import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor(private nasaService: NasaService) { }

ngOnInit(): void {
  this.nasaService.getApod(); 

  this.nasaService.getMarsPhotos().subscribe({
    next: (res) => {
      console.log('🚀 PUNTO 5 - BONUS FUNCIONANDO:', res);
    },
    error: (err) => {
      console.log('❌ El Bonus falló por esto:', err);
    }
  });
  }
}