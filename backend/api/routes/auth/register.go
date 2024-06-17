package auth

import (
	"api/database"
	"api/middleware"
	"api/models"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mailjet/mailjet-apiv3-go/v4"
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
	if err := sendConfirmationEmail(newUser.Email, newUser.FirstName); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur lors de l'envoi de l'e-mail de confirmation",
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
				"username":  newUser.Username,
				"lastName":  newUser.LastName,
			},
		},
	}
	return c.Status(fiber.StatusCreated).JSON(response)
}

func sendConfirmationEmail(to string, name string) error {
	mailjetClient := mailjet.NewMailjetClient(os.Getenv("MAILJET_PUBLIC_KEY"), os.Getenv("MAILJET_PRIVATE_KEY"))
	messagesInfo := []mailjet.InfoMessagesV31 {
		{
		From: &mailjet.RecipientV31{
			Email: "alexandre.bacha@epitech.eu",
			Name: "L'equipe Spotiflyx",
		},
		To: &mailjet.RecipientsV31{
			mailjet.RecipientV31 {
			Email: to,
			Name: name,
			},
		},
		Subject: "Confirmation de création de compte",
		TextPart: "Bonjour, votre compte a été crée avec succes ",
		HTMLPart: "<h3>Nous vous confirmons la création et l'activation de votre compte . Vous pouvez retrouver dès à présent le meilleur du divertissement sur <a href='https://spotiflyx.xyz/'>Spotiflyx</a>!</h3><br />A volonté et sans modération !",
		CustomID: "AppGettingStartedTest",
		},
	}
	messages := mailjet.MessagesV31{Info: messagesInfo}
	res, err := mailjetClient.SendMailV31(&messages)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Data: %+v\n", res)
	return nil
}