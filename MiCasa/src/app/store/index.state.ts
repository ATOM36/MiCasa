import { AdminState } from './states/admin.state';
import { AgenciesState } from './states/agencies.state';
import { AgencyContractsState } from './states/agency-contract.state';
import { AgencyState } from './states/agency.state';
import { AuthState } from './states/auth.state';
import { ClientContractsState } from './states/client-contract.state';
import { ClientState } from './states/client.state';
import { ClientsState } from './states/clients.state';
import { LocationState } from './states/location.state';
import { MessageState } from './states/message.state';

export const AppState = [
  AdminState,
  AgencyState,
  AgenciesState,
  ClientState,
  ClientsState,
  AgencyContractsState,
  ClientContractsState,
  LocationState,
  AuthState,
];
