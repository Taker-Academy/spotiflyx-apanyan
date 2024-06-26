package user

import (
	"fmt"
	"log"
	"os"

	"api/database"
	"github.com/gofiber/fiber/v2"
	"github.com/mailjet/mailjet-apiv3-go/v4"

	"api/middleware"
)

func RemoveHandler(c *fiber.Ctx) error {
	claims := c.Locals("user").(*middleware.CustomClaims)
	userID := claims.UserID
	user, err := database.GetUserByID(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": "Utilisateur non trouvé",
		})
	}
	err = database.RemoveUser(userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": "Erreur interne du serveur",
		})
	}
	err = SendSuppressionEmail(user.Email, user.FirstName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"ok":    false,
			"error": "Erreur lors de l'envoie du mail",
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

func SendSuppressionEmail(to string, name string) error {
	mailjetClient := mailjet.NewMailjetClient(os.Getenv("MAILJET_PUBLIC_KEY"), os.Getenv("MAILJET_PRIVATE_KEY"))
	messagesInfo := []mailjet.InfoMessagesV31{
		{
			From: &mailjet.RecipientV31{
				Email: "alexandre.bacha@epitech.eu",
				Name:  "L'equipe Spotiflyx",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31{
					Email: to,
					Name:  name,
				},
			},
			Subject:  "Confirmation de suppression de compte",
			TextPart: "Bonjour, votre compte a été supprimé avec succes ",
			HTMLPart: "<h3>Nous vous confirmons la suppression de votre compte.</h3><br>Nous ésperons vous revoir bientôt !",
			CustomID: "AppGettingStartedTestt",
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
