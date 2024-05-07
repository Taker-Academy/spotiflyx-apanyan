package media

import (
	"time"
    "github.com/gofiber/fiber/v2"
    "api/models"
    "api/database"
	"api/middleware"
)

func CreatePostHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    user, err := database.GetUserByID(userID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des informations de l'utilisateur",
        })
    }
	var requestBody struct {
		Type	string `json:"type"`
        Title   string `json:"title"`
        Link 	string `json:"link"`
    }
    if err := c.BodyParser(&requestBody); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, paramètres manquants ou invalides",
        })
    }
    media := models.Media{
        Date: 	   time.Now(),
        Title:     requestBody.Title,
		Type:      requestBody.Type,
		Link:	   requestBody.Link,
        UserID:    user.ID,
        Username:  user.Username,
    }
    db := database.GetDB()
    if err := db.Create(&media).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la création du post",
        })
    }

    responseData := map[string]interface{}{
        "id":        media.ID,
        "date":		 media.Date,
		"type":		 media.Type,
        "userId":    media.UserID,
        "Username":  media.Username,
        "title":     media.Date,
		"link":		 media.Link,
    }
    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "ok":   true,
        "data": responseData,
    })
}
