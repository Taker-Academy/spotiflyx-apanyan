package models

import (
	"time"
)

type Media struct {
    ID      uint      `gorm:"primaryKey" json:"id"`
    Type    string    `gorm:"check:(type IN ('vidéo', 'musique'))" json:"type"`
    Name    string    `gorm:"not null" json:"name"`
    Artiste string    `gorm:"not null" json:"artiste"`
    Link    string    `gorm:"not null" json:"link"`
    Date    time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"date"`
    UserID  uint      `json:"user_id"`
}

type Likes struct {
    ID      uint `gorm:"primaryKey" json:"id"`
    UserID  uint `gorm:"not null" json:"user_id"`
    MediaID uint `gorm:"not null" json:"media_id"`
}