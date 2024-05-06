import { Component, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ResponseData, CountryInfoService } from './countryInfo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type CountryDetails = {
  name;
  capital;
  region;
  income;
  longitude;
  latitude;
};

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css',
})
export class WorldMapComponent {
  url = 'https://api.worldbank.org/v2/country/';
  apiDetails: any = [];
  countryLength = 0;
  countryInfo: ResponseData | undefined;
  showDetails = false;

  constructor(
    private renderer: Renderer2,
    private countryInfoService: CountryInfoService,
    private cdr: ChangeDetectorRef
  ) {}

  handleSvgLoad(event: Event) {
    const objectElement = event.target as HTMLObjectElement;

    if (!objectElement?.contentDocument) {
      return console.error('SVG document not loaded.');
    }

    const svgDoc = objectElement.contentDocument;
    const svgPaths = svgDoc.querySelectorAll('path');

    console.log({ svgPaths });

    svgPaths.forEach((path: SVGPathElement) => {
      this.renderer.listen(path, 'mouseover', () => {
        this.renderer.setStyle(path, 'fill', 'blue');
      });

      this.renderer.listen(path, 'mouseout', () => {
        this.renderer.removeStyle(path, 'fill');
      });

      this.renderer.listen(path, 'click', (event) => {
        this.loadCountryInfo(path.id);
      });
    });
  }



  /**
   * one method that accepts a country name as an input parameter that returns additional information gathered from the API for the selected country
   * @param countryID
   */
  loadCountryInfo(countryID: string) {
    this.countryInfoService.callAPI(countryID).subscribe(([, data]) => {
      console.log(data);
      this.apiDetails = data; //api array
      this.countryInfo = data[0];
      console.log('countryInfo', this.countryInfo);
      this.cdr.detectChanges();

    });
  }
}
