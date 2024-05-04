package routes

import (
	"time"
	"github.com/gofiber/fiber/v2"

	"api/models"
	"api/middleware"
	"api/database"
)

func RegisterHandler(c *fiber.Ctx) error {
	var newUser models.User
	db := database.GetDB()

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"ok": false,
			"error": "Impossible de décoder les données de la requête",
		})
	}
	if !db.Where("email = ?", newUser.Email).First(&models.User{}).RecordNotFound() {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok": false,
            "error": "User with this email already exists",
        })
    }
	newUser.Date = time.Now()
	hashedPassword, err := middleware.HashPassword(newUser.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok": false,
			"error": "Erreur lors du chiffrement du mot de passe",
		})
	}
	newUser.Password = hashedPassword
	if err := db.Create(&newUser).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok": false,
            "error": "Internal server error",
        })
    }
	token, err := middleware.GenerateJWT(newUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok": false,
			"error": "Erreur lors de la génération du token JWT",
		})
	}
	response := fiber.Map{
		"ok": true,
		"data": fiber.Map{
			"token": token,
			"user": fiber.Map{
				"email":     newUser.Email,
				"firstName": newUser.FirstName,
				"lastName":  newUser.LastName,
			},
		},
	}
	return c.Status(fiber.StatusCreated).JSON(response)
}