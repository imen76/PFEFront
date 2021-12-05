export class Employee {
    employeId: string;
    nom: string;
    prenom: string;
    matricule: string;
    DateNaissance: Date;
    email: string;
    poste: string;
    dateEmbauche: Date;
    roleEmploye: string;
    password: string;
    // Cityid: string;
    // Address: string;
    // Pincode: string;
    // Country: string;
    // State: string;
    // City: string;
  }
  
  export class Country {
    CountryId: string;
    CountryName: string;
  }
  
  export class State {
    StateId: string;
    StateName: string;
    CountryId: string;
  }
  
  export class City {
    Cityid: string;
    CityName: string;
    StateId: string;
    CountryId: string;
  }
  