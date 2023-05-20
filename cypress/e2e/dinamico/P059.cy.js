import TagSection from "../../support/elements/tagSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Editar Tag con 192 carácteres en el Slug.", () => {
  it("Editar Tag con 192 carácteres en el Slug.", () => {
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
    const testMockaroo = '/p059.json';

    tagSection.getDinamicTagMockaroo(testMockaroo).then((tagData) => {
        const title = tagData.title;
        const newSlug = tagData.slug;
        const description = tagData.description;
        const slug = "slugnew";
  
        tagSection.createTagMockarooData(title, slug, description);
        tagSection.saveTag.click();
        // Verifica que el tag aparezca en el listado de tags
        adminMenu.tagTab.click();
        cy.wait(1000);
        tagSection.tagInList(title).click();
        cy.wait(2000);  
        // Actualiza el titulo
        tagSection.updateTagSlug(newSlug);
        cy.wait(1000);
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
