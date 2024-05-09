package media

import (
    "github.com/gofiber/fiber/v2"
    "api/models"
    "api/database"
    "gorm.io/gorm"
)

func GetPostDetailsHandler(c *fiber.Ctx) error {
    mediaID := c.Params("id")
    if mediaID == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, paramètres manquants ou invalides",
        })
    }

    var media models.Media
    db := database.GetDB()
    if err := db.First(&media, mediaID).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
                "ok":    false,
                "error": "Élément non trouvé",
            })
        }
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur",
        })
    }
    responseData := map[string]interface{}{
        "id":       media.ID,
		"type":		media.Type,
        "date": 	media.Date,
        "userId":   media.UserID,
        "link":     media.Link,
        "title":    media.Title,
        "artiste":  media.Artiste,
    }
    return c.JSON(fiber.Map{
        "ok":   true,
        "data": responseData,
    })
}
