import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "./shared/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {
    }


    canActivate() {
        if (this.userService.loggedIn) {
            return false;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}