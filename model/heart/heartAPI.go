package heart

// 创建 Heart
// @Summary 创建一个新的 Heart 记录
// @Description 创建一个新的 Heart 记录
// @Tags hearts
// @Accept json
// @Produce json
// @Param heart body Hearts true "要创建的 Heart 记录"
// @Success 200 {object} Hearts
// @Failure 400 {string} string "无效输入"
// @Failure 404 {string} string "记录未找到"
// @Failure 500 {string} string "服务器错误"
// @Router /hearts [post]
func CreateHeart(heart *Hearts) (int64, error) {
	affected, err := db.Insert(heart)
	if err != nil {
		return 0, err
	}
	return affected, nil
}

// 获取 Heart
// @Summary 通过 ID 获取 Heart 记录
// @Description 通过 ID 获取 Heart 记录
// @Tags hearts
// @Accept json
// @Produce json
// @Param id path int64 true "Heart 记录的 ID"
// @Success 200 {object} Hearts
// @Failure 400 {string} string "无效输入"
// @Failure 404 {string} string "记录未找到"
// @Failure 500 {string} string "服务器错误"
// @Router /hearts/{id} [get]
func GetHeart(id int64) (*Hearts, error) {
	heart := &Hearts{ID: id}
	exist, err := db.Get(heart)
	if err != nil {
		return nil, err
	}
	if !exist {
		return nil, nil
	}
	return heart, nil
}

// 更新 Heart
// @Summary 更新 Heart 记录
// @Description 更新 Heart 记录
// @Tags hearts
// @Accept json
// @Produce json
// @Param id path int64 true "要更新的 Heart 记录的 ID"
// @Param heart body Hearts true "新的 Heart 记录数据"
// @Success 200 {object} Hearts
// @Failure 400 {string} string "无效输入"
// @Failure 404 {string} string "记录未找到"
// @Failure 500 {string} string "服务器错误"
// @Router /hearts/{id} [put]
func UpdateHeart(id int64, heart *Hearts) (int64, error) {
	affected, err := db.ID(id).Update(heart)
	if err != nil {
		return 0, err
	}
	return affected, nil
}

// 删除 Heart
// @Summary 删除 Heart 记录
// @Description 删除 Heart 记录
// @Tags hearts
// @Accept json
// @Produce json
// @Param id path int64 true "要删除的 Heart 记录的 ID"
// @Success 200 {string} string "删除成功"
// @Failure 400 {string} string "无效输入"
// @Failure 404 {string} string "记录未找到"
// @Failure 500 {string} string "服务器错误"
// @Router /hearts/{id} [delete]
func DeleteHeart(id int64) (int64, error) {
	affected, err := db.ID(id).Delete(&Hearts{})
	if err != nil {
		return 0, err
	}
	return affected, nil
}
