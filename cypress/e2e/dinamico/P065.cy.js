import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Editar Tag con carácteres especiales en la descripción.", () => {
  it("Editar Tag con carácteres especiales en la descripción.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear tags
    cy.login();

    // Va a la pestaña Tags
    adminMenu.tagTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Información crea la tag
    const testMockaroo = '/p065.json';

    tagSection.getDinamicTagMockaroo(testMockaroo).then((tagData) => {
      const title = tagData.title;
      const slug = tagData.slug;
      const newDescription = tagData.description;
      const description = "description";

      tagSection.createTagMockarooData(title, slug, description);
      tagSection.saveTag.click();
      // Verifica que el tag aparezca en el listado de tags
      adminMenu.tagTab.click();
      cy.wait(1000);
      cy.url().then(basAeUrl => {
        cy.log(basAeUrl);
        cy.visit(basAeUrl + ('/') + slug.toLowerCase());
      });
      cy.wait(2000);  
      // Actualiza el titulo
      tagSection.updateTagDescription(newDescription);
      cy.wait(1000);
      tagSection.saveTag.click();

          /* 
    -------------
      THEN
    -------------
    */   
    // Verifica que el tag aparezca en el listado de tags
        adminMenu.tagTab.click();
        cy.wait(1000);
        cy.url().then(basAeUrl => {
          cy.log(basAeUrl);
          cy.visit(basAeUrl + ('/') + slug.toLowerCase());
        });
        cy.wait(2000);      

    });
  });
});
