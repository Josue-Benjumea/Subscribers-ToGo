/* Modelo de lo que nos pide el body para el POST de crear usuario */

export class CreateSubI {
  Name?: any;
  Email?: string;
  CountryCode?: string;
  PhoneNumber?: string;
  JobTitle?: string;
  Area?: string;
  Topics?: any;
  constructor(
    Name = '',
    Email = '',
    CountryCode = '',
    PhoneNumber = '',
    JobTitle = '',
    Area = '',
    Topics = []
  ) {
    this.Name = Name;
    this.Email = Email;
    this.CountryCode = CountryCode;
    this.PhoneNumber = PhoneNumber;
    this.JobTitle = JobTitle;
    this.Area = Area;
    this.Topics = Topics;
  }
}
