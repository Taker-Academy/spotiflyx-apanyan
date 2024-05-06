package routes

import (
	"github.com/gofiber/fiber/v2"

	"api/database"
	"api/middleware"
)

func RemoveHandler(c *fiber.Ctx) error {
	claims := c.Locals("user").(*middleware.CustomClaims)
	userID := claims.UserID
	user, err := database.GetUserByID(userID)
	if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok": false,
            "error": "Utilisateur non trouvé",
        })
    }
	err = database.RemoveUser(userID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok": false,
            "error": "Erreur interne du serveur",
        })
    }
	response := fiber.Map{
		"ok": true,
		"data": fiber.Map{
			"email":     user.Email,
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"removed":   true,
		},
	}
	return c.JSON(response)
}