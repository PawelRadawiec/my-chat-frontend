import {RegistrationStep, SystemUser} from './system-user.model';

export class Registration {
  user: SystemUser;
  previousStep: RegistrationStep;
  currentStep: RegistrationStep;
  nextStep: RegistrationStep;
}


// private ChatSystemUser user;
//
// private RegistrationStep previousStep;
//
// private RegistrationStep currentStep;
//
// private RegistrationStep nextStep;
