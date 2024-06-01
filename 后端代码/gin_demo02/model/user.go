package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name       string `gorm:"varchar(20);not null"`
	Username   string `gorm:"varchar(20);not null;unique"`
	Telephone  string `gorm:"varchar(20);not null;unique"`
	Password   string `gorm:"size:255;not null"`
	Department string `gorm:"varchar(20);not null"`
	Mail       string `gorm:"varchar(20);not null"`
	Gender     string `gorm:"varchar(20);not null"`
	Position   string `gorm:"varchar(20);not null"`
	Age        string `gorm:"varchar(20);not null"`
	Wordid     string `gorm:"varchar(20);not null"`
}

type Token struct {
	gorm.Model
	Token string `gorm:"varchar(1000);not null"`
}
