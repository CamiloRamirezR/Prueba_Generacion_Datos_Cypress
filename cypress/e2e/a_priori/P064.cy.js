import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P064.json";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Editar Tag con 580 carácteres en la descripción.", () => {
  it("Editar Tag con 580 carácteres en la descripción.", () => {
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
    // Puedes acceder a los valores individualmente
    const title = jsonData.title;
    const newDescription = jsonData.description;
    const slug = jsonData.slug;
    const description = "description";
    // intenta publicar el tag
    tagSection.createTagMockarooData(title,slug, description) ;
    tagSection.saveTag.click();
    // Verifica que el tag aparezca en el listado de tags
    adminMenu.tagTab.click();
    cy.wait(1000);
    tagSection.tagInList(title).click();
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
    cy.url().then(basAeUrl => {
      cy.log(basAeUrl);
      cy.visit(basAeUrl + ('/') + slug.toLowerCase());
    });
    cy.wait(2000);
  });
});
