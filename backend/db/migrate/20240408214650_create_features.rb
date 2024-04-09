class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      # Attributes
      t.string :external_id
      t.decimal :magnitude
      t.string :time
      t.boolean :tsunami
      t.string :mag_type, :title, :place, null: false
      t.decimal :longitude, :latitude, null: false

      # Links
      t.string :external_url, null: false

      t.timestamps
    end

    add_index :features, :external_id, unique: true
  end
end
