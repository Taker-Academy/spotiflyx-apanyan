package user

import (
	"github.com/gofiber/fiber/v2"

	"log"
	"fmt"
	"github.com/mailjet/mailjet-apiv3-go/v4"

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
		SendEditEmail(user.Email, user.FirstName)
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

func SendEditEmail(to string, name string) error {
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
		Subject: "Modification de vos informations",
		TextPart: "Bonjour, votreinformations ont été modifié avec succes",
		HTMLPart: "<h3>Nous vous confirmons la suppression de votre compte, si vous n'etes pas l'origine de ces modification veuillez vous rapprocher de nos équipes le plus rapidement possible.<a href='http://localhost:3000/'>Spotiflyx</a>!</h3><br />A volonté et sans modération !",
		CustomID: "AppGettingStartedTesttt",
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
