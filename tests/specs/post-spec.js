describe('Compartilhar foto', () => {

    const loginPage = new LoginPage();
    // const usersDb = require('../libs/users')


    describe('quando eu compartilho uma nova foto', () => {
        beforeAll(() => {]
            let imageName = 'passeio-dunas.jpg'
            loginPage.go();
            loginPage.with('tamara@tamara.com', '123456')
            let path = require('path');
            let imageShare = './../fixtures/' + imageName;
            let absolutPath = path.resolve(_dirname, imageShare);

            Element(by.id('photoId')).sendKeys(absolutPath);
        })

        it('então esta foto deve sr exibida na timeline', () => {
            let photos = await Element.all(by.css('.imageShare'))
            photos[0].getAttribute('src').then(value => {
                expect(value).toContain(imageName)
            });
        });
    });
});