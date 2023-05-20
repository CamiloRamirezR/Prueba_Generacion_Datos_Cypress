import AdminMenu from "../../support/elements/adminMenu";
import GeneralSection from "../../support/elements/generalSection";
import jsonData from "./data/P040.json";

const adminMenu = new AdminMenu();
const generalSection = new GeneralSection();

describe("Edición del campo Title con 151 caracteres.", () => {
  it("Edición del campo Title con 151 caracteres.", () => {
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
    generalSection.titleDescriptionTitleInput.type(title, { force: true });

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
    generalSection.saveButton.should("not.contain", "Saved");
    generalSection.errorMessage.contains("Title is too long");

    cy.reload();

    // Verifica que la información actualizada se mantenga
    generalSection.titleDescriptionButton.click();
    generalSection.titleDescriptionTitleInput.should("not.have.value", title);
    generalSection.titleDescriptionDescInput.should(
      "not.have.value",
      description
    );
  });
});
