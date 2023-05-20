import TagSection from "../../support/elements/tagSection";
//import AdminMenu from "../support/elements/adminMenu";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/P048.json";

const tagSection = new TagSection();
const adminMenu = new AdminMenu();
const baseUrl = Cypress.config("baseUrl");

describe("Crear Tag con 191 carácteres en el Slug", () => {
  it("Crear Tag con 191 carácteres en el Slug", () => {
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
    tagSection.createTagMockarooData(title, slug, description);
    tagSection.saveTag.click();
    /* 
    -------------
      THEN
    -------------
    */

    // Verifica que el tag aparezca en el listado de tags
    cy.wait(1000);
    cy.reload();
    tagSection.editorContainerSlug.should("have.value", slug.toLowerCase());
  });
});
