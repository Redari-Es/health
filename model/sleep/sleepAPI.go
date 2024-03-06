package sleep

import (
	"encoding/json"
	"fmt"
	"time"
)

func sleepTest() {
	defer db.Close()

	err := createTable()
	if err != nil {
		fmt.Println("Failed to create table:", err)
		return
	}

	sleep := Sleep{
		UserID:    123,
		StartTime: time.Now(),
		EndTime:   time.Now().Add(8 * time.Hour),
		Duration:  480,
		Quality:   Excellent,
	}

	err = createSleep(&sleep)
	if err != nil {
		fmt.Println("Failed to create sleep record:", err)
		return
	}

	readSleep(sleep.ID)

	sleep.Quality = Good
	err = updateSleep(&sleep)
	if err != nil {
		fmt.Println("Failed to update sleep record:", err)
		return
	}

	readSleep(sleep.ID)

	err = deleteSleep(sleep.ID)
	if err != nil {
		fmt.Println("Failed to delete sleep record:", err)
		return
	}

	affected, err := db.Insert(&sleep)
	if err != nil {
		fmt.Println("Failed to insert data:", err)
		return
	}

	fmt.Println("Affected rows:", affected)
}

// API
func createTable() error {
	err := db.Sync2(new(Sleep))
	return err
}
func createSleep(sleep *Sleep) error {
	affected, err := db.Insert(sleep)
	if err != nil {
		return err
	}
	if affected == 0 {
		return fmt.Errorf("No records inserted")
	}
	return nil
}

func readSleep(id int64) {
	sleep := Sleep{ID: id}
	has, err := db.Get(&sleep)
	if err != nil {
		fmt.Println("Failed to read sleep record:", err)
		return
	}
	if !has {
		fmt.Println("Sleep record not found")
		return
	}

	sleepJSON, _ := json.Marshal(sleep)
	fmt.Println("Sleep record:", string(sleepJSON))
}

func updateSleep(sleep *Sleep) error {
	affected, err := db.Update(sleep, &Sleep{ID: sleep.ID})
	if err != nil {
		return err
	}
	if affected == 0 {
		return fmt.Errorf("No records updated")
	}
	return nil
}

func deleteSleep(id int64) error {
	affected, err := db.Delete(&Sleep{ID: id})
	if err != nil {
		return err
	}
	if affected == 0 {
		return fmt.Errorf("No records deleted")
	}
	return nil
}
