export interface Machine{
    machine_id: number,
    machine_name: string,
    weight: number,
    brand: string,
    production_year: string,
    last_revision: string,
    client_service_number: string,
    img_uri: string,
    modalities: Array<String>,
  }

  export interface Machines{
    machine_id: number,
    machine_name: string,
  }