import AdminMenu from "../../support/elements/adminMenu";
import GeneralSection from "../../support/elements/generalSection";
import jsonData from "./data/P042.json";

const adminMenu = new AdminMenu();
const generalSection = new GeneralSection();

describe("Edición del campo Title dejandolo vacío.", () => {
  it("Edición del campo Title dejandolo vacío.", () => {
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

    const title = jsonData.title;
    const description = jsonData.description;

    // Llenar título
    generalSection.titleDescriptionTitleInput.clear();

    // Llenar título
    generalSection.titleDescriptionDescInput.clear();
    generalSection.titleDescriptionDescInput.type(description, { force: true });

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
    generalSection.titleDescriptionDescInput.should("have.value", description);
  });
});
