import { faker } from "@faker-js/faker";

import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import GeneralSection from "../../support/elements/generalSection";

const generalSection = new GeneralSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Description con caracteres especiales", () => {
  it("Edición del campo Description con caracteres especiales", () => {
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
    generalSection.editTitleDescriptionMockaroo("P087.json")

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
