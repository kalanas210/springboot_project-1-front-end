import { Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { AllitemsComponent } from './common/allitems/allitems.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CartComponent } from './common/cart/cart.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { AdminProfileComponent } from './common/admin-profile/admin-profile.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'all-items',
        component:AllitemsComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    {
        path:'contact',
        component:ContactUsComponent
    },
    {
        path:'user-dashboard/:userId',
        component:UserdashboardComponent
    },
    {
        path:'admin-dashboard/:userId',
        component:AdmindashboardComponent
    },
    {
        path:'user-profile/:userId',
        component:UserProfileComponent
    },
    {
        path:'admin-profile/:userId',
        component:AdminProfileComponent
    }
];
