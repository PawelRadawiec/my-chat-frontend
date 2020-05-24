import {RegistrationStep, SystemUser} from './system-user.model';

export class Registration {
  user: SystemUser;
  previousStep: RegistrationStep;
  currentStep: RegistrationStep;
  nextStep: RegistrationStep;
}

