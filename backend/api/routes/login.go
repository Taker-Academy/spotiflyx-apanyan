package routes

import (
	"github.com/gofiber/fiber/v2"

	"api/middleware"
	"api/database"
	"api/models"
)

func LoginHandler(c *fiber.Ctx) error {
    var loginUser models.User
    db := database.GetDB()

    if err := c.BodyParser(&loginUser); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Impossible de décoder les données de la requête",
        })
    }
    existingUser := models.User{}
    if err := db.Where("email = ?", loginUser.Email).First(&existingUser).Error; err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvais identifiants",
        })
    }
    if !middleware.VerifyPassword(loginUser.Password, existingUser.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"ok": false,
			"error": "Mot de passe ou identifiant incorrecte",
		})
	}
    token, err := middleware.GenerateJWT(existingUser.ID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur lors de la génération du token JWT",
        })
    }
    response := fiber.Map{
        "ok": true,
        "data": fiber.Map{
            "token": token,
            "user": fiber.Map{
                "email":     existingUser.Email,
                "firstName": existingUser.FirstName,
                "lastName":  existingUser.LastName,
            },
        },
    }
    return c.Status(fiber.StatusOK).JSON(response)
}
