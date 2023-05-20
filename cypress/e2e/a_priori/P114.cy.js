import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import jsonData from "./data/P114.json";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const bio = jsonData.bio;

describe("Editar biografía de usuario", () => {
    it('Editar la biografía de usuario con 201 caracteres', () => {
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
        // Editar la biografía de usuario
        staffSection.bioField.clear();
        cy.wait(1000);
        staffSection.bioField.type(bio, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
/*
-------------
THEN
-------------
 */
        // Validar que APAREZCA el mensaje de error
        staffSection.bioTooLongAlert.should('exist');
        // Validar que el botón de guardar esté deshabilitado
        staffSection.saveChanges.should('not.exist');
        // Retornar a condiciones iniciales
        staffSection.bioField.clear();
        cy.wait(1000);
        staffSection.bioField.type('I am a ghost', { force: true });
        staffSection.saveRetry.click();
    });
});