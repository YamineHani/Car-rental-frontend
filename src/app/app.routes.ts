import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { MainComponent } from '../main/main.component';
import { CarDetailsComponent } from '../car/car-details/car-details.component';
import { CarCreateComponent } from '../car/car-create/car-create.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    } ,
    {
        path: 'details',
        component: CarDetailsComponent
    },
    {
        path: 'addCar',
        component: CarCreateComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
