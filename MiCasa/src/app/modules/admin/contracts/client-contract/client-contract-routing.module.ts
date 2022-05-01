import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientContractComponent } from '@pages/admin/contracts/client-contract/client-contract.component';

const routes: Routes = [{ path: '', component: ClientContractComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientContractRoutingModule {}
