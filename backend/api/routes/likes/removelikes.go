package likes

import (
    "github.com/gofiber/fiber/v2"
    "api/models"
    "api/database"
	"api/middleware"
    "strconv"
    "gorm.io/gorm"
)

func UnlikeMediaHandler(c *fiber.Ctx) error {
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
    var existingLike models.Likes
    if err := db.Where("user_id = ? AND media_id = ?", userID, postID).First(&existingLike).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
                "ok":    false,
                "error": "Vous n'avez pas encore aimé ce post",
            })
        }
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la vérification du like",
        })
    }
    if err := db.Delete(&existingLike).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la suppression du like",
        })
    }
    return c.JSON(fiber.Map{
        "ok":      true,
        "message": "Like retiré avec succès",
    })
}
