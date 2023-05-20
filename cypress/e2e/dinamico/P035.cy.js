import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import { mockarooService } from "../../support/services";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();

describe("Edición del campo Excerpt con caracteres especiales.", () => {
  it("Edición del campo Excerpt con caracteres especiales.", () => {
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

    mockarooService("p035").then((res) => {
      // Crea la página a editar
      const title = res.body.title;
      const content = res.body.body;

      pageSection.createPage(title, content);

      // Publica la página
      pageSection.publishPage();

      /* 
      -------------
        WHEN
      -------------
      */

      const excerpt = res.body.excerpt;

      // Edita el campo Excerpt
      pageSection.editorSettingsButton.click();
      pageSection.getExcerptField.scrollIntoView().type(excerpt);
      pageSection.editorSettingsCloseButton.click();
      cy.wait(1000);
      pageSection.editorUpdateDropdown.click();
      pageSection.editorUpdateButton.click();

      /* 
      -------------
        THEN
      -------------
      */
      cy.reload();
      pageSection.editorSettingsButton.click();
      pageSection.getExcerptField
        .scrollIntoView()
        .should("have.value", excerpt);
    });
  });
});
