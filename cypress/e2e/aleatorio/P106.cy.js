import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const name = faker.name.firstName();
const fbProfile = 'https://www.facebook.com/' + name;

describe("Editar Facebook de usuario", () => {
    it('Editar el Facebook de usuario con un expresión válida', () => {
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
        // Editar el Facebook de usuario
        staffSection.facebookField.clear();
        cy.wait(1000);
        staffSection.facebookField.type(fbProfile, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        /*
    -------------
    THEN
    -------------
         */
        // Verificar que el Facebook de usuario se haya actualizado
        cy.reload();
        cy.wait(1000);
        staffSection.facebookField.should('have.value', fbProfile);
        // Retornar a condiciones iniciales
        staffSection.facebookField.clear();
        cy.wait(1000);
        staffSection.facebookField.type('https://www.facebook.com/ghost', { force: true });
        staffSection.saveChanges.click();

    });
});