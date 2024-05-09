package favoris

import (
	"api/database"
	"api/middleware"
	"api/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RemoveFromFavoritesHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    mediaIDStr := c.Params("id")

    if mediaIDStr == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, paramètres manquants ou invalides",
        })
    }
    mediaID, err := strconv.ParseUint(mediaIDStr, 10, 64)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, ID de média invalide",
        })
    }
    db := database.GetDB()
    var existingFavorite models.Favoris
    if err := db.Where("user_id = ? AND media_id = ?", userID, mediaID).First(&existingFavorite).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "ok":    false,
                "error": "Ce média n'est pas dans vos favoris",
            })
        }
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la vérification des favoris",
        })
    }
    if err := db.Delete(&existingFavorite).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la suppression du média des favoris",
        })
    }

    return c.JSON(fiber.Map{
        "ok":      true,
        "message": "Média retiré des favoris avec succès",
    })
}
