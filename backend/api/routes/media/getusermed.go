package media

import (
    "github.com/gofiber/fiber/v2"
    "api/models"
    "api/database"
	"api/middleware"
)

func GetUserMediasHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    db := database.GetDB()
    var userMedias []models.Media
    if err := db.Where("user_id = ?", userID).Order("date desc").Find(&userMedias).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des posts de l'utilisateur",
        })
    }
    var responseData []map[string]interface{}
    for _, media := range userMedias {
        mediaData := map[string]interface{}{
            "id":       media.ID,
			"type":		media.Type,
            "date": 	media.Date,
            "userId":   media.UserID,
            "link":     media.Link,
            "title":    media.Title,
            "artiste":  media.Artiste,
        }
        responseData = append(responseData, mediaData)
    }
    return c.JSON(fiber.Map{
        "ok":   true,
        "data": responseData,
    })
}
