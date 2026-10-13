import {computed, inject, Service, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AquaticCentersService} from '../infrastructure/aquatic-centers.service';

@Service()
export class AquaticCentersStore {
  private service = inject(AquaticCentersService);

  private centersSignal = signal<AquaticCenter[]>([]);
  readonly centers = this.centersSignal.asReadonly();

  private reservationsSignal = signal<Reservation[]>([]);
  readonly reservations = this.reservationsSignal.asReadonly();

  readonly centersWithCapacity = computed(() => {
    const centers = this.centersSignal();
    const reservations = this.reservationsSignal();

    return centers.map(center => {
      const centerReservations = reservations.filter(r => r.aquaticCenterId === center.id);
      const totalParticipants = centerReservations.reduce((sum, r) => sum + r.participants, 0);
      const availableCapacity = center.capacity - totalParticipants;

      return {
        id: center.id,
        name: center.name,
        activityType: center.activityType,
        capacity: center.capacity,
        latitude: center.latitude,
        longitude: center.longitude,
        reservations: centerReservations,
        totalParticipants,
        availableCapacity
      };
    });
  });

  constructor() {
    this.loadCenters();
    this.loadReservations();
  }

  private loadCenters = (): void => {
    this.service.getCenters().pipe(takeUntilDestroyed()).subscribe({
      next: data => this.centersSignal.set(data)
    });
  };

  private loadReservations = (): void => {
    this.service.getReservations().pipe(takeUntilDestroyed()).subscribe({
      next: data => this.reservationsSignal.set(data)
    });
  };

  addReservation = (item: Reservation, router: Router): void => {
    this.service.createReservation(item).subscribe({
      next: createdItem => {
        this.reservationsSignal.update(items => [...items, createdItem]);
        router.navigate(['/home']).then();
      }
    });
  };
}
