package models

type User struct {
    Username string `gorm:"unique"`
    Password string
    Firstname string
    Lastname string
}
