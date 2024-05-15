package likes

import (
	"api/database"
	"api/middleware"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func GetUserLikesMediaHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    db := database.GetDB()
    var likedMedia []models.Media
    if err := db.
        Table("media").
        Joins("JOIN likes ON media.id = likes.media_id").
        Where("likes.user_id = ?", userID).
        Select("media.title, media.id, media.type, media.mediaid").
        Find(&likedMedia).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des médias likés",
        })
    }
    var responseData []map[string]interface{}
    for _, media := range likedMedia {
        mediaData := map[string]interface{}{
            "title":    media.Title,
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
