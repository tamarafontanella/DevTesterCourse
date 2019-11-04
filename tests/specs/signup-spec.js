const SignUpPage = require('../pages/signup-pages')

describe('Signup', () => {
    const signup_page = new SignUpPage();
    const usersDb = require('../libs/users')

    beforeEach(() => {
        signup_page.go();
    })

    it('Deve exibir email não informado', () => {
        signup_page.button.click();
        expect(signup_page.alert.getText()).toEqual('Email não foi informado.');

    })

    it('Deve exibir nome não informado', () => {
        signup_page.with('teste@teste.com.br', '', '');
        expect(signup_page.alert.getText()).toEqual('Nome não informado.');
    })

    it('Deve exibir nome completo não informado', () => {
        signup_page.with('teste@teste.com.br', 'Tamara', '')
        expect(signup_page.alert.getText()).toEqual('Informe o nome completo.');
    })

    it('Deve exibir senha não infomada', () => {
        signup_page.with('teste@teste.com.br', 'Tamara Teste', '')
        expect(signup_page.alert.getText()).toEqual('Senha não informada.');
    })

    it('Deve informar que não foi possível cadastrar com uma senha menor de 6 caracteres', () => {
        signup_page.with('teste@teste.com.br', 'Tamara Teste', '12345')
        expect(signup_page.alert.getText()).toEqual('Senha deve possuir mínimo de seis caracteres.');
    })

    it('Deve solicitar ao usuario para aceitar os termos de uso', () => {
        signup_page.with('teste@teste.com.br', 'Tamara Teste', 'abx123', false)
        expect(signup_page.alert.getText()).toEqual('Você precisa aceitar os termos de uso.');
    })

    describe('quando um novo usuário é cadastrado', () => {

        beforeEach(() => {
            let email = 'teste@te2ste.com.br'
            usersDb.deleteByEmail(email).then((res) => {
            })
            signup_page.with(email, 'Tamara Teste', 'abx123', true)
        })

        it('Deve ser direcionado para a home', () => {
            container = element(by.css('.appHome'))
            expect(container.getText()).toContain('Olá, Tamara Teste');
        })

    })
    describe('quando um emial já foi cadastrado', () => {

        beforeEach(() => {
            let email = 'teste@te2ste.com.br'
            usersDb.deleteByEmail(email).then((res) => {
            })
            signup_page.with(email, 'Tamara Teste', 'abx123', true);
            signup_page.go();
            signup_page.with(email, 'Tamara Teste', 'abx123', true);

        })

        it('Deve exibir que o mesmo ja esta cadastrado', () => {
            expect(signup_page.alert.getText()).toContain('Email already exists.');
        })

    })

})