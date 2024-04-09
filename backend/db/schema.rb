# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_08_230935) do
  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "feature_id"
    t.index ["feature_id"], name: "index_comments_on_feature_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "external_id"
    t.decimal "magnitude"
    t.string "time"
    t.boolean "tsunami"
    t.string "mag_type", null: false
    t.string "title", null: false
    t.string "place", null: false
    t.decimal "longitude", null: false
    t.decimal "latitude", null: false
    t.string "external_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["external_id"], name: "index_features_on_external_id", unique: true
  end

  add_foreign_key "comments", "features"
end