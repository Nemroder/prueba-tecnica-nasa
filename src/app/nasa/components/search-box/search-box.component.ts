import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  selectedDate: string;

  constructor(private nasaService: NasaService) {
    this.selectedDate = '';
  }

  printDate() {
      if (!this.selectedDate) {
        alert('Por favor selecciona una fecha primero');
        return;
      }
      
      // Servicio con la fecha capturada por el ngModel
      console.log('📅 Fecha capturada en el input:', this.selectedDate);
      this.nasaService.buscarNeo(this.selectedDate);
    }

}
