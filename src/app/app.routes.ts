import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { MainComponent } from '../main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
