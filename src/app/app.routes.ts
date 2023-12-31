import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { MainComponent } from '../main/main.component';
import { CarDetailsComponent } from '../car/car-details/car-details.component';
import { CarCreateComponent } from '../car/car-create/car-create.component';
import { UserInComponent } from '../user_in/user_in.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'user',
        component: UserInComponent
    },
    {
        path: 'details',
        component: CarDetailsComponent
    },
    {
        path: 'addCar',
        component: CarCreateComponent
    }/*,
    {
        path: 'editUser',
        component: UserEditComponent
    }*/

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
