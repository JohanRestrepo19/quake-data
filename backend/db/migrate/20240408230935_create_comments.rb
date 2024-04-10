class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.text :body

      t.timestamps
    end

    add_reference :comments, :feature, foreign_key: true
  end
end
