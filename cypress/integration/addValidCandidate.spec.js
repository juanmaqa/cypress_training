import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import 'cypress-file-upload'

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('Login to OrangeHR page and add a valid candidate', () =>{
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
    cy.wait(3000)
    cy.url().should('include', 'index.php/recruitment/viewCandidates')

  })

  it('Should add a valid candidate', () =>{
    const resume = 'sdet.pdf'

    cy.get('#btnAdd').click()
    cy.url().should('include', 'index.php/recruitment/addCandidate')
    loginPage.userLogin(data.Username, data.Password)
    cy.window((win) => {
      win.stop()
    })
    cy.get('[id="addCandidate_firstName"]').type(can.FirstName)
    cy.get('[id="addCandidate_middleName"]').type(can.Middlename)
    cy.get('[id="addCandidate_lastName"]').type(can.Lastname)
    cy.get('[id="addCandidate_email"]').type(can.Email)
    cy.get('[id="addCandidate_contactNo"]').type(can.ContactNo)
    cy.get('#addCandidate_vacancy').select('Senior QA Lead').should('have.value', '6')
    cy.get('[id="addCandidate_keyWords"]').type(can.Keywords)
    cy.get('[id="addCandidate_comment"]').type(can.Comment)
    cy.get('[id="addCandidate_appliedDate"]')
    cy.get('#addCandidate_resume').attachFile(resume)
    cy.get('#addCandidate_resume').click()
    cy.get('[id="btnSave"]').click()
    cy.get('.message').should('be.visible')
  })
})