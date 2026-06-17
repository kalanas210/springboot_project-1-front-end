import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllitemsComponent } from './components/allitems/allitems.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

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
