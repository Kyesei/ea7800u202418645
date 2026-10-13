import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-aquatic-center-summary',
  imports: [MatCardModule, MatListModule, TranslatePipe],
  templateUrl: './aquatic-center-summary.html',
  styleUrl: './aquatic-center-summary.css'
})
export class AquaticCenterSummary {
  data = input.required<any>();
}
