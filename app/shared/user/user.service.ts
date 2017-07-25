import firebase = require("nativescript-plugin-firebase");
import dialogs = require("ui/dialogs");
import {User} from "./user";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {
    private isLoggedIn: boolean = false;
    private firebaseUser: firebase.User;

    public get loggedIn() {
        return this.isLoggedIn;
    }

    public login(user: User) {
        let loginOptions: firebase.LoginOptions = {
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        };
        console.log('trying loggin with email: ' + user.email + " and password:" + user.password);
        return firebase.login(loginOptions)
            .then(
                result => {
                    console.log("firebase auth success: " + JSON.stringify(result));
                    this.firebaseUser = result;
                    return result;
                })
            .catch(error => {
                dialogs.alert({
                   title: "Login",
                    message: "Parece que há algo de errado com suas credenciais. Por favor, verifique e tente novamente.",
                    okButtonText: "Ok"
                });
                return Promise.reject(error);
            })
    }

    public isLoogedIn() {
        return firebase.getCurrentUser()
            .then(user => {
                console.log('current user:', user);
                this.firebaseUser = user;
                return user;
            });
    }
}