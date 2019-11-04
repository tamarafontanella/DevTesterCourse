class LoginPage {
    constructor() {
        this.inputEmail = element(by.css('input[name=email]'))
        this.inputPassword = element(by.css('input[name=password]'))
        this.submit = element(by.id('singin'))
    }
    go() {
        browser.get('http://localhost:3000/login')
    }

    with(email, pass) {
        this.inputEmail.sendKeys(email);
        this.inputPass.sendKeys(pass);
        this.button.click();
    }
}

module.exports = LoginPage;