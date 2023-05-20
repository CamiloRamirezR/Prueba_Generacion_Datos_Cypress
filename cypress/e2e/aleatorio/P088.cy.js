
import AdminMenu from "../../support/elements/adminMenu";
import GeneralSection from "../../support/elements/generalSection";

const generalSection = new GeneralSection();
const adminMenu = new AdminMenu();

describe("Edición del campo Description dejandolo vacío", () => {
  it("Edición del campo Description dejandolo vacío", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario
    cy.login();

    // Va a la pestaña General
    adminMenu.generalTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Editar descripcion
    generalSection.titleDescriptionButton.click()
    cy.wait(1000)
    generalSection.titleDescriptionDescInput.click()
    generalSection.titleDescriptionDescInput.clear({force:true})
    generalSection.titleDescriptionDescInput.blur()

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca mensaje de error por longitud
    generalSection.errorMessage.should("not.exist");
    generalSection.saveButton.click()
    generalSection.savedSettingsButton.should("exist")
  });
});
