package favoris

import (
	"api/database"
	"api/middleware"
	"api/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func IsPostFavedHandler(c *fiber.Ctx) error {
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
    var isFaved bool
    var existingFavorite models.Favoris
    if err := db.Where("user_id = ? AND media_id = ?", userID, postID).First(&existingFavorite).Error; err == nil {
        isFaved = true
    } else {
        isFaved = false
    }

    return c.JSON(fiber.Map{
        "ok":       true,
        "postId":   postID,
        "isFaved":  isFaved,
    })
}
