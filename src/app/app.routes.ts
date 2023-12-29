import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { MainComponent } from '../main/main.component';
import { CarDetailsComponent } from '../car/car-details/car-details.component';
import { OfficeCreateComponent } from '../office/office-create/office-create.component';
import { CarAddComponent } from '../car/car-add/car-add.component';


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
        component: CarAddComponent
    },
    {
        path: 'addOffice',
        component: OfficeCreateComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
