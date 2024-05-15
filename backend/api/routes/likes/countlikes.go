package likes

import (
	"api/database"
	"api/middleware"
	"api/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetMediaLikesHandler(c *fiber.Ctx) error {
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
    var likeCount int64
    if err := db.Model(&models.Likes{}).Where("media_id = ?", postID).Count(&likeCount).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération du nombre de likes",
        })
    }

    var userLiked bool
    var existingLike models.Likes
    if err := db.Where("user_id = ? AND media_id = ?", userID, postID).First(&existingLike).Error; err == nil {
        userLiked = true
    } else {
        userLiked = false
    }

    return c.JSON(fiber.Map{
        "ok":        true,
        "postId":    postID,
        "likeCount": likeCount,
        "userLiked": userLiked,
    })
}
