import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P054.json";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Crear Tag con la descripción vacia", () => {
  it("Crear Tag con la descripción vacia", () => {
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
    const title = jsonData.title;
    const slug = jsonData.slug;
    const description = jsonData.description;
    // intenta publicar el tag
    cy.log(title);
    cy.log(slug);
    cy.log(description);
    cy.wait(2000);
    tagSection.createTagMockarooDataDescription(title, slug) ;
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */
   
    // Verifica que el tag aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    tagSection.tagInList(title).click();
    cy.wait(2000);    
  });
});
