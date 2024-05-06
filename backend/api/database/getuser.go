package database

import (
	"api/models"
)

func GetUserByEmail(email string) (*models.User, error) {
    var user models.User
    db := GetDB()
    if err := db.Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func GetUserByID(userID uint) (*models.User, error) {
    var user models.User
    db := GetDB()
    if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}
