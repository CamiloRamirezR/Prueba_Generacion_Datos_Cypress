import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import jsonData from "./data/P095.json";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const baseEmail = jsonData.email;
const email = baseEmail + '@' + 'email' + '.com';

describe("Editar email de usuario", () => {
    it('Editar el email de usuario con email de 74 caracteres', () => {
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
        // Editar el email de usuario del perfil Ghost
        staffSection.emailField.clear();
        cy.wait(1000);
        staffSection.emailField.type(email, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        cy.wait(1000);
        /*
    -------------
    THEN
    -------------
         */
        // Verificar que el email de usuario se haya editado correctamente
        cy.reload();
        staffSection.emailField.should('have.value', email);
        // Retornar a condiciones iniciales
        staffSection.emailField.clear();
        cy.wait(1000);
        staffSection.emailField.type('ghost@example.com', { force: true });
        staffSection.saveChanges.click();
    });
});