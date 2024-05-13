package media

import (
	"api/database"
	"api/middleware"
	"api/models"
	"context"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2/clientcredentials"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

func CreateMediaHandler(c *fiber.Ctx) error {
    claims := c.Locals("user").(*middleware.CustomClaims)
    userID := claims.UserID
    user, err := database.GetUserByID(userID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "ok":    false,
            "error": "Erreur interne du serveur lors de la récupération des informations de l'utilisateur",
        })
    }
    var requestBody struct {
        Type    string `json:"type"`
        Title   string `json:"title"`
        Link    string `json:"link"`
    }
    if err := c.BodyParser(&requestBody); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "ok":    false,
            "error": "Mauvaise requête, paramètres manquants ou invalides",
        })
    }
    
    if requestBody.Type == "video" {
        ctx := context.Background()
        apiKey := os.Getenv("YOUTUBE_API_KEY")
        service, err := youtube.NewService(ctx, option.WithAPIKey(apiKey))
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "ok":    false,
                "error": "Erreur lors de l'initialisation du client YouTube",
            })
        }
        videoID := extractYouTubeVideoID(requestBody.Link)
        videoDetails, err := service.Videos.List([]string{"snippet"}).Id(videoID).Do()
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "ok":    false,
                "error": "Erreur lors de la récupération des détails de la vidéo depuis YouTube",
            })
        }
        artistName := videoDetails.Items[0].Snippet.ChannelTitle
        media := models.Media{
            Date:    time.Now(),
            Title:   requestBody.Title,
            Type:    requestBody.Type,
            Link:    requestBody.Link,
            UserID:  user.ID,
            Artiste:  artistName,
            Mediaid: videoID,
        }
        db := database.GetDB()
        if err := db.Create(&media).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "ok":    false,
                "error": "Erreur interne du serveur lors de la création du post",
            })
        }
        responseData := map[string]interface{}{
            "id":        media.ID,
            "date":      media.Date,
            "type":      media.Type,
            "userId":    media.UserID,
            "title":     media.Date,
            "link":      media.Link,
            "artist":    media.Artiste,
            "mediaid":   videoID,
        }
        return c.Status(fiber.StatusCreated).JSON(fiber.Map{
            "ok":   true,
            "data": responseData,
        })
    } else {
        spotifyClientID := os.Getenv("SPOTIFY_CLIENT_ID")
        spotifyClientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
        spotifyAuth := clientcredentials.Config{
            ClientID:     spotifyClientID,
            ClientSecret: spotifyClientSecret,
            TokenURL:     spotify.TokenURL,
        }
        ctx := context.Background()
        httpClient := spotifyAuth.Client(ctx)
        spotifyClient := spotify.NewClient(httpClient)
        trackID := extractSpotifyTrackID(requestBody.Link)
        track, err := spotifyClient.GetTrack(spotify.ID(trackID))
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "ok":    false,
                "error": "Erreur lors de la récupération des détails de la musique depuis Spotify",
            })
        }
        artistName := track.Artists[0].Name
        media := models.Media{
            Date:    time.Now(),
            Title:   requestBody.Title,
            Type:    requestBody.Type,
            Link:    requestBody.Link,
            UserID:  user.ID,
            Artiste: artistName,
            Mediaid: trackID,
        }
        db := database.GetDB()
        if err := db.Create(&media).Error; err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "ok":    false,
                "error": "Erreur interne du serveur lors de la création du post",
            })
        }
        responseData := map[string]interface{}{
            "id":        media.ID,
            "date":      media.Date,
            "type":      media.Type,
            "userId":    media.UserID,
            "title":     media.Date,
            "link":      media.Link,
            "artist":    media.Artiste,
            "mediaid":   trackID,
        }
        return c.Status(fiber.StatusCreated).JSON(fiber.Map{
            "ok":   true,
            "data": responseData,
        })
    }
}

func extractYouTubeVideoID(videoLink string) string {
    parts := strings.Split(videoLink, "/")
    idPart := strings.Split(parts[len(parts)-1], "?")
    videoID := idPart[0]
    
    return videoID
}

func extractSpotifyTrackID(musicLink string) string {
    parts := strings.Split(musicLink, "/")
    trackIDPart := parts[len(parts)-1]
    trackID := strings.Split(trackIDPart, "?")[0]
    
    return trackID
}
