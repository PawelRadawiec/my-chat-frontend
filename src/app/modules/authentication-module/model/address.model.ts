export class Address {
  country: string;
  city: string;
  street: string;
  postalCode: string;

  constructor(props = {}) {
    Object.assign(this, props);
  }

}

