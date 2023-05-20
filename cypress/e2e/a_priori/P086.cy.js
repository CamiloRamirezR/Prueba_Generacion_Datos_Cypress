import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import {generateRandomNum} from "../../support/utilities";
import jsonData from "./data/P086.json";
import GeneralSection from "../../support/elements/generalSection";

const generalSection = new GeneralSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Description con 201 caracteres", () => {
  it("Edición del campo Description con 201 caracteres", () => {
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
    const description = jsonData.Description;
    generalSection.titleDescriptionDescInput.click()
    generalSection.titleDescriptionDescInput.clear({force:true}).type(description, {force:true})
    generalSection.titleDescriptionDescInput.blur()

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca mensaje de error por longitud
    generalSection.buscarError("Description is too long").should("exist");
    generalSection.saveButton.click()
    generalSection.savedSettingsButton.should("not.exist")
  });
});
