const { Annonce, Report } = require('../../models');

describe('Unit Tests: Modèles et Validations', () => {

    // Test 1 : Prix négatif
    test('Validation : Le prix ne peut pas être négatif', async () => {
        const annonce = Annonce.build({ title: "Test", price: -5, category_id: 1 });
        try {
            await annonce.validate();
        } catch (error) {
            expect(error.errors[0].path).toBe('price');
        }
    });

    // Test 2 : Titre obligatoire
    test('Validation : Le titre est obligatoire', async () => {
        const annonce = Annonce.build({ price: 10, category_id: 1 });
        try {
            await annonce.validate();
        } catch (error) {
            expect(error.errors[0].path).toBe('title');
        }
    });

    // Test 3 : Email du signalement (Report)
    test('Validation : L\'email du reporteur doit être valide', async () => {
        const report = Report.build({ 
            reporter_email: 'pas-un-email', 
            message: 'Aidez-moi !',
            annonce_id: 1
        });
        try {
            await report.validate();
        } catch (error) {
            expect(error.errors[0].validatorKey).toBe('isEmail');
        }
    });
});