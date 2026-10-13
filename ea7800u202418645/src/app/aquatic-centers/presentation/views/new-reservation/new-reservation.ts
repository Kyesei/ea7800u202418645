import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {AquaticCentersStore} from '../../../../../../../../../Documents/ea7800u202418645/ea7800u202418645/src/app/aquatic-centers/application/aquatic-centers.store';
import {WeatherService} from '../../../../weather/infrastructure/weather.service';
import {Reservation} from '../../../domain/model/reservation.entity';

@Component({
  selector: 'app-new-reservation',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, TranslatePipe],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css'
})
export class NewReservation extends BaseForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(AquaticCentersStore);
  private weatherService = inject(WeatherService);

  activities = ['swimming', 'diving', 'aqua-fitness', 'water-polo'];
  weatherError = false;
  capacityError = false;
  currentTemperature = 0;
  selectedCenter: any = null;

  form = this.fb.group({
    activityType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    participantName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/.*\S.*/)] }),
    participants: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] })
  });

  constructor() {
    super();
    this.form.controls.activityType.valueChanges.subscribe(type => {
      if (type) {
        const center = this.store.centers().find(c => c.activityType === type);
        if (center) {
          this.selectedCenter = center;
          this.weatherService.getCurrentTemperature(center.latitude, center.longitude).subscribe({
            next: temp => {
              if (temp !== null) {
                this.currentTemperature = temp;
                this.weatherError = false;
              } else {
                this.weatherError = true;
              }
            },
            error: () => this.weatherError = true
          });
        }
      }
    });
  }

  submit() {
    this.capacityError = false;
    if (this.form.invalid || this.weatherError || !this.selectedCenter) return;

    const currentCenterData = this.store.centersWithCapacity().find(c => c.id === this.selectedCenter.id);
    const available = currentCenterData?.availableCapacity ?? 0;
    const requested = this.form.value.participants!;

    if (requested > available) {
      this.capacityError = true;
      return;
    }

    const reservation = new Reservation({
      id: 0,
      aquaticCenterId: this.selectedCenter.id,
      activityType: this.form.value.activityType!,
      participantName: this.form.value.participantName!.trim(),
      participants: requested,
      weatherTemperature: this.currentTemperature,
      reservedAt: new Date().toISOString()
    });

    this.store.addReservation(reservation, this.router);
  }

  cancel() {
    this.router.navigate(['/home']).then();
  }
}
