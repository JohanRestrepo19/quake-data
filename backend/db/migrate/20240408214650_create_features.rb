class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :external_id
      t.decimal :magnitude

      t.timestamps
    end
  end
end
