import {Page,Locator} from '@playwright/test';


export class Login {

private readonly page:Page; 
private readonly emailField:Locator;
private readonly passwordField:Locator;
private readonly loginBtn:Locator;

    //constructor
    constructor(page:Page){
    this.page=page;

    }




}