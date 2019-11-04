class SingUpPage {

    constructor() {
        this.alert = element(by.css('.alert'));
        this.inputEmail = element(by.css('input[name=email]'));
        this.inputName = element(by.css('input[name=fullName]'));
        this.inputPass = element(by.css('input[name=password]'));
        this.inputTerms = element(by.id('terms'));
        this.button = element(by.id('signupButton'));
    }

    go() {
        browser.get('http://localhost:3000/signup');
    }

    with(email, name, pwd, terms) {
        this.inputEmail.sendKeys(email);
        this.inputName.sendKeys(name);
        this.inputPass.sendKeys(pwd);
        if (terms) this.inputTerms.click();
        this.button.click();
    }
}


module.exports = SingUpPage;