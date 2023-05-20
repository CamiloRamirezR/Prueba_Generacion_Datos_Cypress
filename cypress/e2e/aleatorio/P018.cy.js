import AdminMenu from "../../support/elements/adminMenu";
import DesignSection from "../../support/elements/designSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const designSection = new DesignSection();
const label = faker.word.noun();

describe("Agregar link de navegación", () => {
  it("Agregar un nuevo link de navegación con label aleatorio", () => {
    /*
-------------
GIVEN
-------------
*/
    // Autenticar usuario
    cy.login();
    // Design Ir a la pestaña Design
    adminMenu.designTab.click();
    cy.wait(1000);
    /*
-------------
WHEN
-------------
*/
    // Agregar Label AnotherHome con url http://localhost:2368/AnotherHome/
    designSection.createLink(label);
    cy.wait(1000);
    // Guardar cambios
    designSection.saveButton.click();
    cy.wait(2000);
    /*
-------------
THEN
-------------
*/
    // Verificar existencia de nuevo url
    designSection.verifyNewLabel;
  });
});
