import AdminMenu from "../../support/elements/adminMenu";
import GeneralSection from "../../support/elements/generalSection";
import { mockarooService } from "../../support/services";

const adminMenu = new AdminMenu();
const generalSection = new GeneralSection();

describe("Edición del campo Title con caracteres especiales", () => {
  it("Edición del campo Title con caracteres especiales", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear páginas
    cy.login();

    // Va a la pestaña Pages
    adminMenu.generalTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    generalSection.titleDescriptionButton.click();
    cy.wait(1000);

    mockarooService("p041").then((res) => {
      // Crea la página a editar
      const title = res.body.title;
      const description = res.body.description;

      // Llenar título
      generalSection.titleDescriptionTitleInput.clear();
      generalSection.titleDescriptionTitleInput.type(title, { force: true });

      // Llenar título
      generalSection.titleDescriptionDescInput.clear();
      generalSection.titleDescriptionDescInput.type(description, {
        force: true,
      });

      // Actualizar información
      generalSection.saveButton.click();
      cy.wait(1000);

      /* 
      -------------
        THEN
      -------------
      */

      // Botón cambia texto
      generalSection.saveButton.contains("Saved");

      cy.reload();

      // Verifica que la información actualizada se mantenga
      generalSection.titleDescriptionButton.click();
      generalSection.titleDescriptionTitleInput.should("have.value", title);
      generalSection.titleDescriptionDescInput.should(
        "have.value",
        description
      );
    });
  });
});
