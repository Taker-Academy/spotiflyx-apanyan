package media

import (
    "github.com/gofiber/fiber/v2"
    "api/models"
    "api/database"
)

func GetMediasHandler(c *fiber.Ctx) error {
    db := database.GetDB()
    var medias []models.Media
    if err := db.Order("date DESC").Find(&medias).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur",
        })
    }
    var responseData []map[string]interface{}
    for _, media := range medias {
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

    response := fiber.Map{
        "ok":   true,
        "data": responseData,
    }
    return c.JSON(response)
}