package routes

import (
	"github.com/gofiber/fiber/v2"

	"api/database"
	"api/middleware"
	"api/models"
)

func EditHandler(c *fiber.Ctx) error {
	claims := c.Locals("user").(*middleware.CustomClaims)
	userID := claims.UserID
	user, err := database.GetUserByID(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok": false,
			"error": "Erreur interne du serveur",
		})
	}
	var editData models.User
	if err := c.BodyParser(&editData); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"ok": false,
			"error": "Échec de la validation des paramètres",
		})
	}
	if editData.FirstName != "" {
		user.FirstName = editData.FirstName
	}
	if editData.LastName != "" {
		user.LastName = editData.LastName
	}
	if editData.Email != "" {
		user.Email = editData.Email
	}
	if editData.Password != "" {
		hashedPassword, err := middleware.HashPassword(editData.Password)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"ok": false,
				"error": "Erreur interne du serveur",
			})
		}
		user.Password = hashedPassword
	}
	if err := database.UpdateUser(user.ID, user); err != nil {
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
		},
	}
	return c.JSON(response)
}
