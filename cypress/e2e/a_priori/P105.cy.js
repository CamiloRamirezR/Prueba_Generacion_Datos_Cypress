import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import jsonData from "./data/P105.json";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const inner = jsonData.website;
const website = "http://www." + inner + ".com";

describe("Editar website de usuario", () => {
  it("Editar el website de usuario con url usando emojis.", () => {
    /*
    -------------
    GIVEN
    -------------
         */
    // Autenticar usuario
    cy.login();
    // Ir a la pestaña Staff
    adminMenu.staffTab.click();
    cy.wait(1000);
    staffSection.ghostStaffMember.click();
    cy.wait(1000);
    /*
    -------------
    WHEN
    -------------
         */
    // Editar el website de usuario
    staffSection.websiteField.clear();
    cy.wait(1000);
    staffSection.websiteField.type(website, { force: true });
    cy.wait(1000);
    // Guardar cambios
    staffSection.saveChanges.click();
    /*
    -------------
    THEN
    -------------
         */
    // Validar que APAREZCA el mensaje de error
    staffSection.noFormatWebsiteAlert.should("be.visible");
    // Verificar que el botón de guardar cambios esté deshabilitado
    staffSection.saveChanges.should("not.exist");
    // Retornar a condiciones iniciales
    staffSection.websiteField.clear();
    cy.wait(1000);
    staffSection.websiteField.type("https://ghost.org", { force: true });
    staffSection.saveRetry.click();
  });
});
