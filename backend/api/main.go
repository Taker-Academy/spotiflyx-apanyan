package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"api/database"
    "api/routes"
)

func setupRoutes(app *fiber.App) {
    app.Post("/auth/register", routes.RegisterHandler)
    app.Post("/auth/login", routes.LoginHandler)
}

func main() {
    database.ConnectDB()
    app := fiber.New()
    app.Use(cors.New())
    setupRoutes(app)

    log.Fatal(app.Listen(":8080"))
}