import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
//import {ButtonDirective} from '@coreui/angular';
/* import "@coreui/coreui/scss/coreui";
 */

@Component({
  selector: 'app-calendario',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent  {

  selectedDate: string | null = null;

  startDate: Date = new Date();





}
