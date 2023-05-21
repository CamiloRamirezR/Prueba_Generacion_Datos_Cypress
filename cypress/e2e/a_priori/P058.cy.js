import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P058.json";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Editar Tag con titulo vacio.", () => {
  it("Editar Tag con titulo vacio.", () => {
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
    // Puedes acceder a los valores individualmente    
    // Puedes acceder a los valores individualmente
    const newTitle = jsonData.title;
    const slug = jsonData.slug;
    const description = jsonData.description;
    const title = "Titulo a Modificar";
    // intenta publicar el tag
    tagSection.createTagMockarooData(title,slug, description) ;
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
    tagSection.editTagMockarooDataTitle(slug, description) ;
    cy.wait(1000);
    tagSection.saveTag.click();    
    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca el mensaje de error
    cy.wait(1000);
    tagSection.msgErrorTitleEmpty;
    cy.wait(2000);
  });
});
