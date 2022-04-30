import { AdminState } from './states/admin.state';
import { AgenciesState } from './states/agencies.state';
import { AgencyContractsState } from './states/agency-contract.state';
import { AgencyState } from './states/agency.state';
import { ClientContractsState } from './states/client-contract.state';
import { ClientState } from './states/client.state';
import { ClientsState } from './states/clients.state';
import { MessageState } from './states/message.state';

export const AppState = [
  AdminState,
  AgencyState,
  AgenciesState,
  ClientState,
  ClientsState,
  AgencyContractsState,
  ClientContractsState,
];
