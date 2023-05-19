import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import jsonData from "./data/P093.json";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const name =  jsonData.name;
describe('Editar nombre de usuario', () => {
    it('Editar el nombre de usuario del perfil Ghost con expresión regular de 192 carácteres', () => {
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
        // Editar el nombre de usuario del perfil Ghost
        staffSection.nameField.clear();
        cy.wait(1000);
        staffSection.nameField.type(name, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        /*
    -------------
    THEN
    -------------
         */
        // Verificar que APAREZCA el mensaje de error
        staffSection.nameTooLongAlert.should("be.visible");
        // Verificar que botón de guardar cambios esté deshabilitado
        staffSection.saveChanges.should('not.exist');
        // Retornar a condiciones iniciales
        staffSection.nameField.clear();
        cy.wait(1000);
        staffSection.nameField.type('Ghost', { force: true });
        staffSection.saveRetry.click();
    });
});