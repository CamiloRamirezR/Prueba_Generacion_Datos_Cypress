import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import { mockarooService } from "../../support/services";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición únicamente del titulo de una página existente con caracteres especiales.", () => {
  it("Edición únicamente del titulo de una página existente con caracteres especiales.", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();

    // Va a la pestaña Pages
    adminMenu.pageTab.click();
    cy.wait(1000);

    // Edita el título de una página con caracteres especiales
    mockarooService("p028").then((res) => {
      // Crea la página a editar
      const title = res.body.title;
      const content = res.body.body;

      pageSection.createPage(title, content);

      // Publica la página
      pageSection.publishPage();
      pageSection.goBackToPagesSection.click();

      /* 
    -------------
      WHEN
    -------------
    */

      // Selecciona la página a editar
      pageSection.pageInList(title).click();
      const newTitle = res.body.newTitle;

      pageSection.editorContainerTitle.clear();
      cy.wait(2000);
      pageSection.editorContainerTitle.type(newTitle);
      pageSection.editorUpdateDropdown.click();
      pageSection.editorUpdateButton.click();
      cy.wait(3000);

      /* 
      -------------
        THEN
      -------------
      */

      // Verifica que la página aparezca visible en el sitio con el nuevo contenido
      pageSection.editorSettingsButton.click();
      pageSection.editorViewPage.invoke("attr", "href").then((href) => {
        cy.visit(href);
      });
      cy.wait(1000);
      site.pageTitle.contains(newTitle);
    });
  });
});
