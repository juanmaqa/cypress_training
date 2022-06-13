class loginPage{

    verifyPage(){
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/')
    }

    userLogin(user, password){
        cy.get('[id="txtUsername"]').should('be.visible').clear().type(user)
        cy.get('[id="txtPassword"]').should('be.visible').clear().type(password)
        cy.get('[id="btnLogin"]').should('be.visible').click()
    }
}
export default loginPage