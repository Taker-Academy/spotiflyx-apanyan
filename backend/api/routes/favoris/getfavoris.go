package favoris

import (
	"api/database"
	"api/middleware"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func GetUserFavoriteMediasHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    db := database.GetDB()
    var favoriteMedia []models.Media
    if err := db.
        Table("media").
        Joins("JOIN favoris ON media.id = favoris.media_id").
        Where("favoris.user_id = ?", userID).
        Select("media.id, media.type, media.mediaid").
        Find(&favoriteMedia).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des médias favoris",
        })
    }
    var responseData []map[string]interface{}
    for _, media := range favoriteMedia {
        mediaData := map[string]interface{}{
            "id":       media.ID,
            "type":     media.Type,
            "mediaid":  media.Mediaid,
        }
        responseData = append(responseData, mediaData)
    }
    return c.JSON(fiber.Map{
        "ok":   true,
        "data": responseData,
    })
}
