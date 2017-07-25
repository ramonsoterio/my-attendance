import {Component, OnInit} from "@angular/core";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {Router} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import {Color} from "tns-core-modules/color";

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.css", "./login.css"]
})
export class LoginComponent implements OnInit {

    user: User;

    constructor(private userService: UserService, private router: Router, private page: Page) {
        this.user = new User();

        this.user.email = "deividfortuna@gmail.com";
        this.user.password = "deivid123";

        this.page.backgroundColor = new Color("gray");
        this.page.actionBarHidden = true;

        // this.userService.isLoogedIn()
        //     .then(() => this.router.navigate(["items"]));
    }

    ngOnInit() {
        console.log("this.userService.loggedIn", this.userService.loggedIn);
    }

    login() {
        this.userService.login(this.user)
            .then(result => {
                this.router.navigate(["items"]);
            });
    }
}