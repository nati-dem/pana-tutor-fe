import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./service/auth.guard";
import { PageNotFoundComponent } from "./app-root/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  {
    path: "users",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./course-category/course-category.module").then(
        (m) => m.CourseCategoryModule
      ),
  },
  {
    path: "course-admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./course-admin/course-admin.module").then(
        (m) => m.CourseAdminModule
      ),
  },
  {
    path: "course",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./course/course.module").then((m) => m.CourseModule),
  },
  {
    path: "tutors",
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import("./tutor-public/tutor-public.module").then((m) => m.TutorPublicModule),
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  { path: "**", component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
