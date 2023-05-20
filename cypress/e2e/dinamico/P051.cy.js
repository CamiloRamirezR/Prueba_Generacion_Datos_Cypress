import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Crear Tag con 501 carácteres en la descripción", () => {
  it("Crear Tag con 501 carácteres en la descripción", () => {
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
    const testMockaroo = '/p051.json';

    tagSection.getDinamicTagMockaroo(testMockaroo).then((tagData) => {
      const title = tagData.title;
      const slug = tagData.slug;
      const description = tagData.description;
            
      tagSection.createTagMockarooData(title, slug, description);
      
      tagSection.saveTag.click();
      /* 
      -------------
        THEN
      -------------
      */   
      // Verifica que aparezca el mensaje de error
      cy.wait(1000);
      tagSection.editorRetryTagButton;
      cy.wait(2000);
    });
    
   
  });
});
