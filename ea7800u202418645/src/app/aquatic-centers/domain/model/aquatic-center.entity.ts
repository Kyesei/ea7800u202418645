import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class AquaticCenter implements BaseEntity {
  #id: number;
  #name: string;
  #activityType: string;
  #capacity: number;
  #latitude: number;
  #longitude: number;

  constructor(props: { id: number; name: string; activityType: string; capacity: number; latitude: number; longitude: number }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#activityType = props.activityType;
    this.#capacity = props.capacity;
    this.#latitude = props.latitude;
    this.#longitude = props.longitude;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }
  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }
  get activityType(): string { return this.#activityType; }
  set activityType(value: string) { this.#activityType = value; }
  get capacity(): number { return this.#capacity; }
  set capacity(value: number) { this.#capacity = value; }
  get latitude(): number { return this.#latitude; }
  set latitude(value: number) { this.#latitude = value; }
  get longitude(): number { return this.#longitude; }
  set longitude(value: number) { this.#longitude = value; }
}
