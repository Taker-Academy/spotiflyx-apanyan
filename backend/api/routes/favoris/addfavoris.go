package favoris

import (
	"api/database"
	"api/middleware"
	"api/models"
	"strconv"
	"github.com/gofiber/fiber/v2"
)

func AddToFavoriteHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    postIDStr := c.Params("id")

    if postIDStr == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, paramètres manquants ou invalides",
        })
    }
    postID, err := strconv.ParseUint(postIDStr, 10, 64)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, ID de post invalide",
        })
    }
    db := database.GetDB()

    var existingFavorite models.Favoris
    if err := db.Where("user_id = ? AND media_id = ?", userID, postID).First(&existingFavorite).Error; err == nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Cette vidéo est déjà dans vos favoris",
        })
    }
    newFavorite := models.Favoris{
        UserID: userID,
        MediaID: uint(postID),
    }
    if err := db.Create(&newFavorite).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de l'ajout de la vidéo aux favoris",
        })
    }
    return c.JSON(fiber.Map{
        "ok":      true,
        "message": "Vidéo ajoutée aux favoris avec succès",
    })
}
