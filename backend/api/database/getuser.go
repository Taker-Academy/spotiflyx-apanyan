package database

import (
	"api/models"
	"strconv"
)

func GetUserByEmail(email string) (*models.User, error) {
    var user models.User
    db := GetDB()
    if err := db.Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func GetUserByID(userIDStr string) (*models.User, error) {
    userID, err := strconv.ParseUint(userIDStr, 10, 64)
    if err != nil {
        return nil, err
    }
    var user models.User
    db := GetDB()
    if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}
