import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private _dates: any[] = [];
  private _apodObj: any;
  private apiKey: string = '6B8JIQomCUxgjNPfseE9dm6FGHxa0foOLT3nGGaS';

  constructor(private http: HttpClient) { }

  get dates() {
    return [...this._dates];
  }

  get apod() {
    return this._apodObj;
  }

  getApod() {
    /**
     * Paso 1
     * Almacene en una variable un número aleatorio entre 1 y 7
     */
    const diasAleatorios = Math.floor(Math.random() * 7) + 1;
    

    /**
     * Paso 2
     * Fecha aleatoria entre últimos 7 días
     * Obtenga y almacene en una variable la fecha actual
     * A los días de la fecha actual le debe restar el número obtenido en el Paso 1 para obtener una fecha aleatoria de los últimos 7 días
     */
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - diasAleatorios);
    const formattedDate = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD


    /**
     * Paso 3
     * petición APOD endpoint
     * consulte el endpoint https://api.nasa.gov/planetary/apod enviando los parámetros:
     * date = fecha obtenida en el Paso 2 en formato YYYY-MM-DD
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * Debe asignar el valor de la respuesta del endpoint a la variable global _apod que ya se encuentra declarada, ejemplo: this._apodObj = respuesta;
     */

    this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&date=${formattedDate}`)
      .subscribe({
        next: (res) => this._apodObj = res,
        error: (err) => console.error('Error cargando APOD', err)
      });
  }

  /**
   * 
   * @param date Fecha seleccionada en el input date
   */
    /**
     * Paso 1
     * petición NEOWS endpoint
     * consulte el endpoint https://api.nasa.gov/neo/rest/v1/feed enviando los parámetros:
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * start_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * end_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * Nota: para start_date y end_date se utiliza el mismo valor el cual llega como parámetro de la función.
     * Debe asignar el valor de la respuesta del endpoint a la variable global _dates, ejemplo: this._dates = respuesta.near_earth_objects[date], siendo [date] el parámetro que recibe la función;
     */

    buscarNeo(date: string) {
    /** Paso 1: Petición NEOWS */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('start_date', date)
      .set('end_date', date);

    this.http.get<any>(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${this.apiKey}&start_date=${date}&end_date=${date}`)
        .subscribe({
          next: (res) => {
            console.log('✅ Datos de Asteroides recibidos:', res); // <-- ESTO es lo que verás en consola
            this._dates = res.near_earth_objects[date] || [];
          },
            error: (err) => console.error('Error cargando Asteroides', err)
    });
  }
  getMarsPhotos() {
    return this.http.get(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=${this.apiKey}`);
  }
}
