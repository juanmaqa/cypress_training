import HomePageElement from "../../constants/constant"

class HomePage{
   
    constructor(){}
    
    clickOnLoginButton(){
        cy.get(HomePageElement.LOGINBUTTON).should('be.visible').click()
    }
}

export default HomePage