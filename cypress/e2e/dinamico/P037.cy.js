import PageSection from "../../support/elements/pagesSection";
import AdminMenu from "../../support/elements/adminMenu";
import { mockarooService } from "../../support/services";

const pageSection = new PageSection();
const adminMenu = new AdminMenu();

describe("Edición del campo Publish date con una fecha y hora superior a la actual.", () => {
  it("Edición del campo Publish date con una fecha y hora superior a la actual.", () => {
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

    mockarooService("p037").then((res) => {
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
      cy.wait(1000);
      /* 
      -------------
        THEN
      -------------
      */
      // Verificar que salga el error correspondiente
      pageSection.DateTimePickerError.should("be.visible");
    });
  });
});
