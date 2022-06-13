import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
require('cypress-downloadfile/lib/downloadFileCommand')

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('Login to OrangeHR page and download candidate resume', () =>{
  let data
  let can

    beforeEach(("Launch web Page"), () => {
     
     cy.fixture('users').then((fdata) =>{
       data = fdata
     })    
     cy.fixture('candidate').then((cdata) =>{
      can = cdata
      })  
    })

    it('Should login and go to view candidates page', () =>{
        cy.visit('/')
        homePage.clickOnLoginButton()
        loginPage.userLogin(data.Username, data.Password)
    
        cy.get('#menu_recruitment_viewRecruitmentModule > b').click()
        cy.wait(2000)
        cy.url().should('include', 'index.php/recruitment/viewCandidates')        
      })

    it('Should find the candidate added and download the attached file', () =>{
      const row = [can.FirstName]
      cy.wrap(row).each(row => {
        cy.get('tbody tr').each(tableRow =>{
          cy.wrap(tableRow).find('td a').eq(1).should('contain', 'Download').click()
          if(row)
          return false
        })          
      })
    }) 
})