package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"api/database"
	"api/middleware"
	"api/routes/auth"
    "api/routes/user"
)

func setupRoutes(app *fiber.App) {
    app.Post("/auth/register", auth.RegisterHandler)
    app.Post("/auth/login", auth.LoginHandler)
    app.Get("/user/me", middleware.Authenticate, user.InfoHandler)
	app.Put("/user/edit", middleware.Authenticate, user.EditHandler)
    app.Delete("/user/remove", middleware.Authenticate, user.RemoveHandler)
}

func main() {
    database.ConnectDB()
    app := fiber.New()
    app.Use(cors.New())
    setupRoutes(app)

    log.Fatal(app.Listen(":8080"))
}