package database

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
    "log"
    "api/models"
)

var db *gorm.DB

func ConnectDB() {
    var err error
    ***REMOVED***
    db, err = gorm.Open("postgres", dataSourceName)
    if err != nil {
        log.Fatal(err)
    }
    db.AutoMigrate(&models.User{}, &models.Media{}, &models.Favoris{}, &models.Likes{})
    log.Println("Connexion à la base de données établie et migration automatique effectuée.")
}

func GetDB() *gorm.DB {
    return db
}

