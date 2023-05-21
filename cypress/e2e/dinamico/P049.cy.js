import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Agregar usuario slack  con carácteres especiales URL", () => {
  it("Agregar usuario slack  con carácteres especiales URL", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear tags
    cy.login();

    // Va a la pestaña Tags
    adminMenu.tagIntegrations.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Agrgar información SLACK
    const testMockaroo = '/p049.json';
    tagSection.getDinamicCodeMockaroo(testMockaroo).then((tagData) => {
    const URL = tagData.URL;
    const user = tagData.user;
    cy.log(URL);
    cy.log(user);
    tagSection.slackTag.click();
    tagSection.createHeader(URL, user);
      
    tagSection.saveTag.click();
      /* 
      -------------
        THEN
      -------------
      */   
      // Verifica que aparezca el usuario de slack creado
      cy.wait(1000);
      tagSection.editorRetryTagButton;
      cy.wait(2000);
    });
    

  });
});
