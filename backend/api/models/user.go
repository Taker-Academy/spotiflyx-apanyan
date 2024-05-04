package models

import (
	"time"
)

type User struct {
    ID       uint      `gorm:"primaryKey" json:"id"`
    Username string    `gorm:"uniqueIndex;not null" json:"username"`
    FirstName string   `gorm:"not null" json:firstname`
    LastName string    `gorm:"not null" json:lastname`
    Email    string    `gorm:"uniqueIndex;not null" json:"email"`
    Password string    `gorm:"not null" json:"-"`
    Date     time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"date"`
}

type Favoris struct {
    ID      uint `gorm:"primaryKey" json:"id"`
    UserID  uint `gorm:"not null" json:"user_id"`
    MediaID uint `gorm:"not null" json:"media_id"`
}
