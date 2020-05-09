import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorsResolverB } from './_resolvers/doctors.resolver';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { HospitalDetailsComponent } from './hospitals/hospital-details/hospital-details.component';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver }
      },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { users: ListsResolver }
      },
      {
        // Adding the role to the route
        path: 'admin',
        component: AdminPanelComponent,
        data: {roles: ['Admin', 'Moderator']}
      },
      // {
      //   // Adding the role to the route
      //   path: 'app-members-before-reg',
      //   component: MembersBeforeRegComponent,
      // },
      {
        // Adding the role to the route
        path: 'app-doctors',
        component: DoctorsComponent,
        resolve: { users: DoctorsResolverB }
      },
      {
        path: 'app-about',
        component: AboutComponent
      },
      {
        path: 'app-hospitals',
        component: HospitalsComponent,
      },
      {
        path: 'hospital/:id',
        component: HospitalDetailsComponent
      },
      {
        path: 'app-about',
        component: AboutComponent
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
