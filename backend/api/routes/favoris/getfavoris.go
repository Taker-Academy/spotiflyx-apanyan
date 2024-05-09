package favoris

import (
	"api/database"
	"api/middleware"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func GetUserFavoriteMediaHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    db := database.GetDB()
    var favoriteMedia []models.Media
    if err := db.
        Table("Media").
        Joins("JOIN favorites ON Media.id = favorites.media_id").
        Where("favorites.user_id = ?", userID).
        Select("Media.link, Media.name, Media.artist").
        Find(&favoriteMedia).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des médias favoris",
        })
    }
    var responseData []map[string]interface{}
    for _, media := range favoriteMedia {
        mediaData := map[string]interface{}{
            "link":   media.Link,
            "name":   media.Title,
            "artist": media.Artiste,
        }
        responseData = append(responseData, mediaData)
    }
    return c.JSON(fiber.Map{
        "ok":   true,
        "data": responseData,
    })
}
