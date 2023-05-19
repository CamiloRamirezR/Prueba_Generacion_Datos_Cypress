import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import { mockarooService } from "../../support/services";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();

describe("Edición del campo Publish date con una fecha y hora inferior a la actual.", () => {
  it("Edición del campo Publish date con una fecha y hora inferior a la actual.", () => {
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

    mockarooService("p036").then((res) => {
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

      const date = res.body.publish_date;
      const time = res.body.publish_time;

      // Edita el campo Excerpt
      pageSection.editorSettingsButton.click();
      pageSection.getDateField.scrollIntoView().clear();
      pageSection.getDateField.type(date);
      pageSection.getTimeField.scrollIntoView().clear();
      pageSection.getTimeField.type(time);
      pageSection.editorSettingsCloseButton.click();
      cy.wait(1000);
      pageSection.editorUpdateDropdown.click();
      pageSection.editorUpdateButton.click();

      /* 
      -------------
        THEN
      -------------
      */
      // Verificar que los campos tengan los valores guardados
      cy.reload();
      pageSection.editorSettingsButton.click();
      pageSection.getDateField.scrollIntoView().should("have.value", date);
      pageSection.getTimeField.scrollIntoView().should("have.value", time);
    });
  });
});
